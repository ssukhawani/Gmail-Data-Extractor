# Gmail-Data-Extractor

    Set up a project in the Google Cloud Console:

    Go to the Google Cloud Console (https://console.cloud.google.com/) and create a new project.
    Once your project is created, enable the Gmail API by navigating to the "Enable APIs and Services" page and searching for the Gmail API.
    After enabling the Gmail API, you will need to create credentials for your project, such as an API key or OAuth 2.0 client ID and secret.

    Create an OAuth client ID:

    Go to the "Credentials" page in the Cloud Console.
    Click on the "Create credentials" button and select "OAuth client ID".
    Select "Web application" as the application type.
    Enter a name for your application and specify the authorized JavaScript origins and redirect URIs.
    Click on the "Create" button.
    A client ID and client secret will be generated for you.

    Add Client id and client secret in config.js and do node index.js ..!!
    
    You need to redirect to open http://localhost:3000/login
    
    and do the authentication with the gmail id which you have used in google cloud console.
    
    Voila after authentication u can check the console showing email messages with OTP
    
