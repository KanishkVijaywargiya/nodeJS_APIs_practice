const express = require('express');
const router = express.Router();
const passport = require('passport');   //as these will be private route
const mongoose = require('mongoose');

// Load person model
const Person = require('../../models/Person');

// load profile model
const Profile = require('../../models/Profile');

// @type    GET
//@route    /api/profile
// @desc    route for personnal user profile
// @access  PRIVATE
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // profile for user exists or not
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json({ profilenotfound: 'No profile found' })
                }
                res.json(profile);
            })
            .catch(err => console.log('Got Some Error in Profile' + err)
            );
    }
);

// @type    POST
//@route    /api/profile
// @desc    route for UPDATING/SAVING personnal user profile
// @access  PRIVATE
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const profileValues = {};
        profileValues.user = req.user.id;
        if (req.body.username) profileValues.username = req.body.username;
        if (req.body.website) profileValues.website = req.body.website;
        if (req.body.country) profileValues.country = req.body.country;
        if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;
        if (req.body.dob) profileValues.dob = req.body.dob;
        if (typeof req.body.languages !== undefined) {
            profileValues.languages = req.body.languages.split(',');
        }
        // get social links
        profileValues.social = {};
        if (req.body.youtube) profileValues.social.youtube = req.body.youtube;
        if (req.body.facebook) profileValues.social.facebook = req.body.facebook;
        if (req.body.instagram) profileValues.social.instagram = req.body.instagram;

        // do database stuffs here
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileValues },
                        { new: true }
                    )
                        .then(profile => res.json)
                        .catch(err => console.log('Problem in update' + err));
                } else {
                    Profile.findOne({ username: profileValues.username })
                        .then(
                            profile => {
                                // case:: username already exists
                                if (profile) {
                                    res.status(400).json({ username: 'Username already exists' })
                                }
                                // save user
                                new Profile(profileValues)
                                    .save()
                                    .then(profile => res.json(profile))
                                    .catch(err => console.log('Data is not saved!' + err));
                            }
                        )
                        .catch(err => console.log('Username is not comming' + err));
                }
            })
            .catch(err => console.log('Problem in fetching Profile' + err));

        console.log('user values:: ', profileValues);
    }
);


// @type    GET
//@route    /api/profile/:username
// @desc    route for getting user profile based on USERNAME
// @access  PUBLIC
router.get('/:username', (req, res) => {
    Profile.findOne({ username: req.params.username })
        .populate('user', ['name', 'profilepic'])
        .then(profile => {
            if (!profile) {
                res.status(404).json({ usernotfound: 'user not found' })
            }
            res.json(profile);
        })
        .catch(err => console.log('Error in fetching username' + err));
})

// @type    GET
//@route    /api/profile/id/:id
// @desc    route for getting user profile based on _ID
// @access  PUBLIC
router.get('/id/:id', (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .populate('user', ['name', 'profilepic'])
        .then(profile => {
            if (!profile) {
                res.status(404).json({ usernotfound: 'user not found' });
            }
            res.json(profile);
        })
        .catch(err => console.log('Error in fetching username' + err));
});

// @type    GET
//@route    /api/profile/find/everyone
// @desc    route for getting user profile of EVERYONE
// @access  PUBLIC
router.get('/find/everyone', (req, res) => {
    Profile.find()
        .populate('user', ['name', 'profilepic'])
        .then(profiles => {
            if (!profiles) {
                res.status(404).json({ usernotfound: 'No profiles were found' });
            }
            res.json(profiles);
        })
        .catch(err => console.log('Error in fetching username' + err));
});

// @type    DELETE
//@route    /api/profile/delete
// @desc    route for deleting user based on ID
// @access  PRIVATE
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (!profile) {
                    res.status(404).json({ usernotdeleted: 'No profiles were found' });
                }
                res.json(profile);
            })
            .catch(err => console.log('Error in deleting user' + err));
        Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
                Person.findOneAndRemove({ _id: req.user.id })
                    .then(() => res.json({ Success: 'Successefully deletion is done' }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log('Error in deleting user' + err));
    }
);

module.exports = router;