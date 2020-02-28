const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialise(passport, getUserByEmail, getUserById)
{
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null)
        {
            return done(null, false, { message: 'Email or password incorrect' })
        }

        try
        {
            if (bcrypt.compareSync(password, user.password))
            {
                return done(null, user)
            }
            else
            {
                return done(null, false, { message: 'Email or password incorrect' })
            }
        }
        catch (e)
        {
            done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialise