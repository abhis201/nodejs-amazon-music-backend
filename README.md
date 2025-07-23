# Amazon Music Backend Template

A Node.js backend application that replicates core features of Amazon Music, built with Express.js, MongoDB, and Mongoose.

## Features

- **User Management**: Registration, login with JWT authentication
- **Music Library**: Songs, albums, and artist management
- **Playlists**: Create, manage, and modify personal playlists
- **Charts**: Popular songs and recently added music
- **Search**: Find songs by name or genre

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /user/register` - User registration

### Songs
- `POST /songs/add` - Add a new song (auth required)
- `DELETE /songs/:id` - Remove a song (auth required)
- `GET /songs/search/name?name=query` - Search songs by name
- `GET /songs/search/genre?genre=query` - Search songs by genre

### Albums
- `POST /album/create` - Create a new album (auth required)
- `GET /album` - Get all albums
- `GET /album/:id` - Get specific album with songs

### Playlists
- `POST /playlist/create` - Create a new playlist (auth required)
- `GET /playlist/:id` - Get playlist details
- `DELETE /playlist/:id` - Delete playlist (auth required)
- `PUT /playlist/:id/add-song` - Add song to playlist (auth required)
- `PUT /playlist/:id/remove-song` - Remove song from playlist (auth required)

### Charts
- `GET /chart/popular` - Get most popular songs
- `GET /chart/recent` - Get recently added songs

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   NODE_ENV=development
   PORT=8080
   DB_CONN=mongodb://localhost:27017
   SECRET_KEY=your-secret-key-here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Database Models

### User
- userid (String, unique)
- password (String, hashed)
- playlist (Array of Playlist references)

### Song
- name (String)
- artist (String)
- album (Album reference)
- genre (String)
- duration (Number, in seconds)
- releaseDate (Date)
- playCount (Number)
- url (String)

### Album
- name (String, unique)
- artist (String)
- releaseDate (Date)
- genre (String)
- songs (Array of Song references)
- coverImage (String, URL)
- description (String)

### Playlist
- Name (String, unique)
- Songs (Array of Song references)
- createdBy (User reference)
- createdDate (Date)
- description (String)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the request header:
```
token: your-jwt-token
```