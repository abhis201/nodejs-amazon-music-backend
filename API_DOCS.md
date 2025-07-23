# Amazon Music API Documentation

## Base URL
`http://localhost:8080`

## Authentication
Include JWT token in request headers:
```
token: your-jwt-token-here
```

## API Endpoints

### Authentication

#### Login
```
POST /login
Content-Type: application/json

{
  "userid": "john_doe",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login Successful",
  "token": "jwt-token-here"
}
```

#### Register
```
POST /user/register
Content-Type: application/json

{
  "userid": "john_doe",
  "password": "password123"
}

Response:
{
  "userid": "john_doe",
  "playlist": [],
  "_id": "user-id"
}
```

### Songs

#### Add Song
```
POST /songs/add
Authorization: token jwt-token-here
Content-Type: application/json

{
  "name": "Song Name",
  "artist": "Artist Name",
  "genre": "Pop",
  "duration": 210,
  "url": "http://example.com/song.mp3",
  "albumId": "album-id-optional"
}

Response:
{
  "success": true,
  "song": { song object }
}
```

#### Search Songs by Name
```
GET /songs/search/name?name=song-name

Response:
{
  "success": true,
  "songs": [array of songs]
}
```

#### Search Songs by Genre
```
GET /songs/search/genre?genre=pop

Response:
{
  "success": true,
  "songs": [array of songs]
}
```

### Albums

#### Create Album
```
POST /album/create
Authorization: token jwt-token-here
Content-Type: application/json

{
  "name": "Album Name",
  "artist": "Artist Name",
  "genre": "Pop",
  "coverImage": "http://example.com/cover.jpg",
  "description": "Album description"
}

Response:
{
  "success": true,
  "album": { album object }
}
```

#### Get All Albums
```
GET /album

Response:
{
  "success": true,
  "albums": [array of albums with songs]
}
```

### Playlists

#### Create Playlist
```
POST /playlist/create
Authorization: token jwt-token-here
Content-Type: application/json

{
  "name": "My Playlist",
  "description": "My favorite songs"
}

Response:
{
  "success": true,
  "playlist": { playlist object }
}
```

#### Add Song to Playlist
```
PUT /playlist/:playlistId/add-song
Authorization: token jwt-token-here
Content-Type: application/json

{
  "songId": "song-id-here"
}

Response:
{
  "success": true,
  "message": "Song added to playlist successfully"
}
```

### Charts

#### Get Popular Songs
```
GET /chart/popular?limit=10

Response:
{
  "success": true,
  "songs": [array of popular songs]
}
```

#### Get Recent Songs
```
GET /chart/recent?limit=10

Response:
{
  "success": true,
  "songs": [array of recent songs]
}
```
