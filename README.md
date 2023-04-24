## Chatroom Application using Laravel

#### Objective: To develop a secure and user-friendly chat application using the Laravel framework that allows users to create, join, and manage chatrooms.

##### Features:

###### User Authentication and Authorization:
*  User registration with email verification.
*  User login and logout functionality.
*  Password recovery and reset functionality.
*  User profile management (update profile information, change password, delete account).

###### Chatroom Management:
*  Create a chatroom with a unique ID, name, optional description, and privacy settings (public/private).
*  Set a password for private chatrooms.
*  Edit chatroom details (name, description, password).
*  Delete chatroom by the creator only.
*  List all public chatrooms and joined private chatrooms on a dashboard.

###### Chatroom Access:
*  Join a public chatroom using the unique chatroom ID.
*  Join a private chatroom using the unique chatroom ID and password.
*  Leave a chatroom.

###### Real-time Messaging:
*  Send and receive messages in real-time within a chatroom.
*  Display message timestamps and sender's username.
*  Support image insertion in chat messages.
*  Automatically update message history when new messages are sent or received.

###### Security and Privacy:
*  Secure user authentication using encryption and secure hashing techniques.
*  Protect chatroom passwords with encryption.
*  Implement authorization checks to ensure only authorized users can access and manage chatrooms.
*  Sanitize user inputs to prevent cross-site scripting (XSS) and SQL injection attacks.

###### Responsive User Interface:
*  Develop a responsive and user-friendly interface using Tailwind CSS.
*  Optimize the interface for various devices (desktop, tablet, mobile).

### Installation:
Make sure you have the following installed on your system:
* PHP 8.2 or higher `php -v`
* Composer 2.0 or higher `composer -V`
* Node.js 18.0 or higher `node -v`

You can download and install Node.js using nvm (Node Version Manager):
* `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
* `bash: source ~/.bashrc` or `zsh: source ~/.zshrc`
* `nvm install node 18`
* `nvm use node 18`

Install dependencies with `composer install` and `npm install`.

Copy the `.env.example` file to `.env` and update the database credentials.

Generate APP_KEY: `php artisan key:generate`

Configure the database connection in the `.env` file.

Create the database tables: `php artisan migrate`

Run `php artisan serve` to start the development server.

Run `npm run dev` to compile the frontend.

❗ If you're using storage public directory for your image uploads, make sure to run `php artisan storage:link`

Enjoy! 🤟


