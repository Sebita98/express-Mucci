import passport from "passport"
import { Strategy } from 'passport-local'
import GHStrategy from 'passport-github2'
import User from "../models/User.js"
import jwt from "passport-jwt"


const { GH_CLIENT, GH_SECRET } = process.env
const githubCb = 'http://localhost:8080/api/auth/github/callback'
const callback = 'http://localhost:8080/api/auth/github/callback'




export default function inicializePassport() {
    passport.use(
        'github',
        new GHStrategy(
            { clientID: GH_CLIENT, clientSecret: GH_SECRET, callbackURL: githubCb },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    //console.log(profile)
                    let one = await User.findOne({ email: profile._json.login })
                    if (!one) {
                        let user = await User.create({
                            name: profile._json.name,
                            email: profile._json.login,
                            age: 18,
                            photo: profile._json.avatar_url,
                            password: profile._json.id
                        })
                        return done(null, user)
                    }
                    return done(null, one)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, userName, password, done) => {
                try {
                    let one = await User.findOne({ email: userName })
                    if (one) {
                        let user = await User.create(req.body)
                        delete user.password
                        return done(null, user)
                    }
                    return done(null, false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(
        'login',
        new Strategy(
            { usernameField: 'email' },
            async (userName, password, done) => {
                try {
                    let one = await User.findOne({ email: userName })
                    if (one) {
                        return done(null, one)
                    }
                    return done(null, false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        //console.log(id)
        return done(null, user)
    })
}

export default function () {
    passport.serializeUser(
        (user, done) => done(null, user._id)
    )
    passport.deserializeUser(
        async (id, done) => {
            const user = await User.findById(id)
            return done(null, user)
        }
    )
    passport.use()
    passport.use()
    passport.use(
        'github',
        new GHStrategy(
            { clientID: GH_CLIENT, clientSecret: GH_SECRET, callbackURL: callback },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile)
                    let one = await User.findOne({ email: profile._json.login })
                    if (one) {
                        return done(null, one)
                    }
                    let user = await User.create({
                        name: profile._json.name,
                        email: profile._json.login,
                        password: 'hola1234',
                        photo: profile._json.avatar_url
                    })
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(   //estrategia para jwt (solo sirve para autentificar usuarios)
        'jwt',
        new jwt.Strategy(
            { secretOrKey: process.env.SECRET_JWT, jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req) => req?.cookies['token']]) },
            async (jwt_payload, done) => {
                //jwt_payload es el resultado del desencriptamiento del token
                //done SIEMPRE es el ultimo parametro de la cb(siempre)
                try {
                    let one = await User.findOne({ email: jwt_payload.email })
                    if (one) {
                        delete one.password
                        return done(null,one)
                    }else{
                        return done(null,false)
                    }
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )
}