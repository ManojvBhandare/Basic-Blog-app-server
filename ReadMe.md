## Database Schema

### User Schema:

- **\_id**: ObjectId (automatically generated)
- **username**: String
- **password**: String (hashed for security)

### Post Schema:

- **\_id**: ObjectId (automatically generated)
- **title**: String
- **content**: String
- **published**: Boolean
- **author**: ObjectId (references User \_id)
- **createdAt**: Date
- **updatedAt**: Date

## Routes

### Authentication Routes:

- POST /auth/signup

  - Description: Creates a new user account.
  - Input Body: { username: 'user', password: 'pass' }
  - Output: { message: 'User created successfully' }

- POST /auth/login
  - Description: Logs in a user and generates a JWT token for authentication.
  - Input Body: { username: 'user', password: 'pass' }
  - Output: { message: 'Login successful', token: 'generated-jwt-token' }

### Admin Routes:

- POST /admin/signup

  - Description: Creates a new admin account.
  - Input Body: { username: 'admin', password: 'pass' }
  - Output: { message: 'Admin created successfully' }

- POST /admin/posts

  - Description: Creates a new blog post.
  - Input: Headers: { 'Authorization': 'Bearer generated-jwt-token' }, Body: { title: 'post title', content: 'post content', published: true }
  - Output: { message: 'Post created successfully', postId: "new post id" }

- GET /admin/posts
  - Description: Returns all the blog posts.
  - Input: Headers: { 'Authorization': 'Bearer generated-jwt-token' }
  - Output: { posts: [ { id: 1, title: 'post title', content: 'post content', published: true }, ... ] }

### User Routes

- GET /users/posts

  - Description: Lists all the blog posts.
  - Input: Headers: { 'Authorization': 'Bearer generated-jwt-token' }
  - Output: { posts: [ { id: 1, title: 'post title', content: 'post content', published: true }, ... ] }

- POST /users/posts

  - Description: Creates a new blog post.
  - Input: Headers: { 'Authorization': 'Bearer generated-jwt-token' }, Body: { title: 'post title', content: 'post content', published: true }
  - Output: { message: 'Post created successfully', postId: "new post id" }

- GET /users/posts/:postId

  - Description: Retrieves a specific blog post.
  - Input: Headers: { 'Authorization': 'Bearer generated-jwt-token' }
  - Output: { id: 1, title: 'post title', content: 'post content', published: true }

- GET /users/publishedPosts
  - Description: Lists all the published blog posts.
  - Input: Headers: { 'Authorization': 'Bearer generated-jwt-token' }
  - Output: { posts: [ { id: 1, title: 'post title', content: 'post content', published: true }, ... ] }
