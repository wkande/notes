## Insomnia

You can execute all the APIs using [Insomnia](https://insomnia.rest) by downloading, unzipping and importing the <a id="raw-url" href="../GettingStarted/Insomnia.json.zip">Notes API Definitions</a> file into Insomnia. Everything is set up and ready to go.  While the APIs can return either JSON or XML, all Insomnia requests are setup to return JSON.

![insomnia](/assets/insomnia.png)

##### Try Authenticating

Be sure you are using the **prod** environment.

1. Select the **Create a Code** endpoint > enter your **Email Address** > select the **Send** button.

1. Get the code from your email.

1. Select the **Get a Token** endpoint > enter your **Code** > select the **Send** button.

1. A **JWT Token** has now been added to the Insomnia ENV and you can now make other API calls.

##### Get your Notes

When you authenticated for the first time a welcome note was created for you.

1. Select the **Get user Notes** endpoint > select the **Send** button.
