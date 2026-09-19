# Hometown Hub

Hometown Hub is a community-based web platform designed to help people connect with others from their city or village through a centralized digital community space.

## Problem

Local communities often depend on scattered WhatsApp groups and social media platforms for announcements, discussions, and events. This makes it difficult to organize information and stay connected with people from the same hometown.

## Solution

Hometown Hub provides dedicated communities where users can:

- Discover city and village communities
- Request to join communities
- Share posts and announcements
- Like and comment on posts
- Create and join community events
- View community updates in one place
- Manage their profile and community participation

Community content is private and accessible only to approved members.

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- User profile

### Communities
- Create communities
- City and village categories
- Community discovery
- Join requests
- Admin approval/rejection
- Community member management

### Posts
- Create text posts
- Create announcements
- Upload images
- Like posts
- Comment on posts
- Edit and delete own posts
- Pinned posts support

### Events
- Create community events
- Event details and location
- Start and end time
- Join/leave events
- Attendee count
- Edit and delete own events

### Notifications
- Notification system
- Read/unread notification status

## Technology Stack

### Frontend
- React.js
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT

### Database
- SQLite for development/demo

### Other
- Git & GitHub
- REST APIs
- JWT Authentication

## Project Structure

```text
Hometown-Hub/
│
├── backendpart/
│   └── backend/
│       ├── accounts/
│       ├── communities/
│       ├── events/
│       ├── notifications/
│       ├── posts/
│       ├── config/
│       ├── manage.py
│       └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   └── components/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── Readme.MD