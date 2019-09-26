const passport = require('passport');
const gpts = require('passport-google-plus-token');
const User = require('./models/User')

//google oauth strategy
passport.use('googleToken', new gpts({
    clientID: ' 566235978229-d04nunit2k0lfsvn4ps952fmmfjgum2i.apps.googleusercontent.com ',
    clientSecret: ' ZAC5kWoxsSQ0L_J-0BJ3N3s0 '
}, async (accessToken, refreshTokwn, profile, done) => {
    try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshTokwn);
        console.log('profile', profile);

        //check if user exist in database
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            console.log('User Already exists in our database')
            return done(null, existingUser);
        }
        console.log('User doesnt exist we are creating a newone')
        //if new user
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,

            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message)
    }


}))