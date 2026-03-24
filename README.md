# Kuisis - Interactive Quiz Application

![GitHub Banner](https://github.com/user-attachments/assets/22331db2-a0fa-4436-942e-4407f46cd2ec)

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" />
</p>

## Overview

Kuisis is an interactive quiz application built with React that allows users to test their knowledge across various categories. The application fetches quiz categories and questions from an external API, provides an intuitive quiz-taking experience, and offers customization options for quiz difficulty and length.

## Data Source

This application uses the [Open Trivia Database](https://opentdb.com/) API to fetch quiz categories and questions. Open Trivia Database is a free-to-use, user-contributed trivia question database that provides a wide variety of trivia questions across multiple categories and difficulty levels. The API returns questions in JSON format, making it easy to integrate into web applications.

## Features

- Browse and search through multiple quiz categories
- Customize quiz difficulty (easy, medium, hard)
- Select number of questions (5, 10, 15, or 20)
- Interactive quiz interface with real-time feedback
- Score tracking and results summary
- Responsive design that works on desktop and mobile devices

## Tech Stack

- React 19
- React Router for navigation
- Context API for state management
- Tailwind CSS 4 for styling
- Font Awesome icons
- Vite 6 for build tooling
- Clerk for authentication

## Project Structure

```
src
├── /components - Reusable UI components
├── /contexts - React contexts for state management
├── /pages - Main application pages
├── /assets - Static assets like images and icons
└── /utils - Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
3. Start the development server
4. Open your browser and visit http://localhost:5173

## Usage

1. Browse the homepage to see available quiz categories
2. Use the search bar to find specific categories
3. Click on a category to set quiz options (difficulty and number of questions)
4. Start the quiz and answer questions
5. View your results at the end of the quiz
6. Return to the homepage to try another category
