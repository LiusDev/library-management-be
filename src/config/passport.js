const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const config = require("./config")

// Web authentication strategy
passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.callbackURL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				if (!profile) {
					return done(new Error("Google profile is undefined"), null)
				}

				const user = {
					googleId: profile.id,
					email: profile.emails?.[0]?.value,
					name: profile.displayName,
					givenName: profile.name?.givenName,
					familyName: profile.name?.familyName,
					avatar: profile.photos?.[0]?.value,
				}
				return done(null, user)
			} catch (error) {
				console.error("Google Strategy Error:", error)
				return done(error, null)
			}
		}
	)
)

// Mobile authentication strategy
passport.use(
	"google-mobile",
	new GoogleStrategy(
		{
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL:
				config.google.mobileCallbackURL || config.google.callbackURL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				if (!profile) {
					return done(new Error("Google profile is undefined"), null)
				}

				const user = {
					googleId: profile.id,
					email: profile.emails?.[0]?.value,
					name: profile.displayName,
					givenName: profile.name?.givenName,
					familyName: profile.name?.familyName,
					avatar: profile.photos?.[0]?.value,
				}
				return done(null, user)
			} catch (error) {
				console.error("Google Mobile Strategy Error:", error)
				return done(error, null)
			}
		}
	)
)

module.exports = passport
