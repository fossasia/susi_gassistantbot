# SUSI Google Assistant Bot

[![Build Status](https://travis-ci.org/fossasia/susi_gassistantbot.svg?branch=master)](https://travis-ci.org/fossasia/susi_gassistantbot)

## Setup:

1. First of all we will make a project on [developer&#39;s console](https://console.actions.google.com/) of Actions on Google and after that you will set up action on your project using API.AI

![Console](/docs/images/console.png)

2. Above step will open API.AI console create an agent there for the project you created above.

3. Now we have an agent. In order to create SUSI action on Google, we will define an &quot;intent&quot; from options in the left menu on API.AI, but as we have to receive responses from [SUSI API](http://api.susi.ai) so we have to set up webhook first.

![Fulfillment](/docs/images/fulfillment.png)

4.  See &quot;fulfillment&quot; option in the left menu. Open to enable it and to enter the url. We have to deploy the above written code onto heroku, but first make a github repository and push the files in the folder we created above.

    In command line change current directory to folder we created above and  write
            git init
            git add .
            git commit -m&quot;initial&quot;
            git remote add origin &lt;URL for remote repository&gt;
            git remote -v
            git push -u origin master


You will get URL for remote repository by making repository on your github and copying this link of your repository.

![URL](/docs/images/url.png)

5. Now we have to deploy this github repository to heroku to get url.


    If you don&#39;t have account on heroku sign up here [https://www.heroku.com/](https://www.heroku.com/) else just sign in and create a new app.

![HerokuApp](/docs/images/herokuapp.png)

    Deploy your repository onto heroku from deploy option and choosing github as a deployment method.

![deployment](/docs/images/deployment.png)

    Select automatic deployment so that when you make any changes in github repository, they are automatically deployed to heroku.

6.  Open your app from option on top right and copy the link of your heroku app and append it with /webhook and enter this url into fulfillment url.

            https://{Your\_App\_Name}.herokuapp.com/webhook

7. After setting up webhook we will make an intent on API.AI, which will get what user is asking from SUSI. To create an intent, select &quot;intent&quot; from the left menu and create an intent with information given in screenshot below and save your intent.

![Intent](/docs/images/intent.png)

8. After creating the intent, your agent is ready. You just have to integrate your agent with Actions on Google. Turn on its integration from the &quot;integration&quot; option in left menu.

9. Your SUSI action on Google Assistant is ready now. To test it click on actions on Google in integration menu and choose &quot;test&quot;option.

![Test](/docs/images/test.png)

10. You can only test it with the same email you have used for creating the project in step 7. To test it on Google Assistant follow this demo video [https://youtu.be/wHwsZOCKaYY](https://youtu.be/wHwsZOCKaYY)
