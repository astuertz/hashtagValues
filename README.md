# hashtagValues
# A Dating App, modeled after OKCupid, created in React Native using various libraries.

# Included libraries: React Navigation, AWS Authentication, React Gestures Handler, React Reanimated, React Picker, React-Native Vector Icons

# Purpose: To create an intuitive design for a dating app, utilizing the commonplace swipe feature, which gives users a sense of control and purpose in using the app. This app was modeled after OKCupid because it is my own personal favorite dating app (at least as far as its design). Thus, in building this app, I am focused on understanding and recreating the common features that I find in OKC but omitting those which are either unnecessary, superfluous, or damaging to the experience.

# Main features included:

# *Card Swiping

# *Animated "Next Card" behind the profile being considered

# *Intuitive navigation (bottom tabs) to explore different screens.

# *The ability to inspect a profile more thoroughly in a separate screen (pushed) which I refer to as "Profile View"

# *The ability to click on an image from the Profile View to see the "Gallery View" of pictures

# *Multiple pictures which wrap outside the current view. In the normal Card Stack, these pictures can be navigated using taps on the right or left of the picture, as to not interfere with the swiping of the card or confuse the user. In the Profile View, images are navigable using a ScrollView which operates in a similar fashion.

# *A scrollable profile. In conjunction with the image reel, more information about the user is rendered below the images, which may extend beyond the initial view of the screen. By implementing a ScrollView, users can scroll down and view more of the user's profile before deciding to swipe left or right. At the bottom of the Card, a bold blue link takes them to the Profile View to get more information about the user. Likewise, the user can click on the Percent Sign at the top of the Card (under the image reel) to do this as well.

# *The default method of "liking" or "noping" a user is to swipe on the card, providing a smooth animation of the Card going to either side of the screen. Likewise, an X or a Heart appears during this animation, which reflects the X and Heart at the bottom of the Screen in the Profile View.

# *If a user wishes to select "Like" or "Nope" in the Profile View, two floating buttons appear at the bottom above the navigation in order to accomplish this. OnPress, the button press is sent back to the main Animation Stack for Cards as a navigation paramater, returning either a 1 for like or a -1 for nope. This, then, triggers a swift animation similar to swiping (but not using a separate function that calls the onLike and the onNope without the need for swiping) and completes the process upon sending the user back to the main Animation Stack which contains the Card.

# *However a user "likes" or "nopes" a profile, the current and nextprofile is updated using as useEffect() that looks for changes in currentProfile.

# *A loading screen which is implemented while the app retrieves any useful information.

# *A core set of search parameters, such as religion, sexuality, and so forth.


# Main excluded features:

# *Top Navigation. (This is used in OKC to select how to prioritize the profiles it shows based on things like Match Percent or Geographical Proximity. I intend to make this app such that this is not a necessary feature.)

# *Questions. OKC uses a bunch of approved questions to help users find matches; however, this is poorly implemented, and as of now, I don't intend to use it myself.

# *Super Likes. A new OKC feature. It is not a bad concept, but the way it is implemented in OKC interferes with the UI. If I implement it, it will be done more conscientiously.

# *Live. Not sure why this is needed in a dating app. No intention to implement it.


# Main new features:

# *Using community created hashtags to help narrow the search. The intention here is to let users input Hashtags both for themselves and for their ideal partners. This should use suggestive text as well as show the popularity of the suggestions to help users narrow down which hashtags they, themselves, want to include in both their own profile and those of their ideal match.

# *For match preferences, each parameter will appear with a sliding scale, where users can select how important each parameter is, and thereby allowing users to, in a sense, create their own match algorithm. In another sense, users can indicate what is important to them, but set each of these as relatively important to the other parameters they have selected. In addition, any parameter can be set to "must include" which would then exclude all other profiles that do not contain that choice for that parater until the user changes their preferences. This gives the user a great amount of control over what profiles are being shown to them, making the search process more efficient.


# Monetization:

# The overall strategy for monetization is to create a complete app which is designed with the user in mind. This means making the app intuitive and highly useful. Most modern dating apps extend features to users only through a paid subscription (often costing much more than what is warranted) and otherwise forces users to sift through potentially hundreds of profiles of people who explicitly do not match what they are looking for in a partner with the hope of eventually stumbling upon one that does. In effect, this message is clear: face the drugery of sifting through endless profiles with little hope of finding a good match, or give us money to stop the suffering. Because pretty much all dating apps are designed this way today, the user has only a choice of torturers, facing the same problem no matter which service they use. Alternatively, users can pay money for a service that only let's the user interact with a paid plan. This is effective for some (since users who pay are often more dedicated than those who don't), but it puts a lot of pressure on the user to hurry up and find love, since every month costs them more and more money.


# Therefore, the main monetization of this app is to first focus on the main task: helping users find meaningful connections, and second to create a solid monetization strategy. The monetization of this app should not include any kind of subscription which bars the users from this purpose, and the potential loss of revenue from gatekeeping key features will be made up with the volume of users and a loyalty from those users. Thus every and any sensible monetary strategy that can be used without gatekeeping key features should be used, so long as it does not severly limit the users' experience.


# The recommendation here is to 1. Use the app as a data aggregation software. This is extremely easy to do, since the apps main focus is for users to define their own values. Each hashtag is an important indicator of what is truly important for the user, which is valuable information for marketing companies and producers. Just as Google Ads target users based on aggregated data, so too, the hashtags can be targeted by advertisers. And thus, 2. Users should have the option to either use the service free of charge, being exposed to adverts and having their data collected for marketing purposes, OR they can pay a reasonable monthly subscription fee to have an ad-free experience and to keep their data private from advertisers.


# Other methods such as "Boosts" which give users more exposure or other non-fundamental features can be used for monetization as well, but I think it's important for users to also be able to see who likes them as well (and therefore should not be monetized). The main purpose of the app is to help users find partners, and what will keep them coming back (or recommending it to friends) is the ease and sensibility of the app. Frustrating your users is not a good long-term market strategy. Provide value and service first and make money by soaking up the demand for your type of app. 


# Some will find love and be happy with their partner. And thus, they will not seek to use your app in the future. But they will brag to their friends about how easy it was to find a partner, sending you endless customers with cost-free marketing. Others will find a partner but eventually split with their partner and come back to you, recognizing that you don't waste their time and provide an excellent service. Either way, you win! You do not win, however, if you are the best smelling turd amongst a pile of crap.
