# scrolling-live-blog

## About

App that fetches blog posts on the home page and uses redux for state management. 20 of the blog posts are shwon by default and when the user scrolls to the bottom (100px before) another 20 of the blog posts are rendered if they exist. Meanwhile the app is also subscribed to a mock websocket channel which intervally fires dummy posts which are rendered in real-time on the index page and are temporarily highlighted as new in addition to toast notifcations. Clicking on any of the preview blog posts will navigate you using Next.js page router to a dynamic route specific for that blog post to which the post is served in full from the redux store.

Notes: Tests are light but only demonstratable. If you go to the blog specific page and there is no post in the state, no post will load but this is understood and I feel there is little point in adding in this demonstration but in practice I would add a catch if there are no totalPosts then it would trigger the fetch used on the index page. Styling is light (this would be a perfect usecase for viewTransition API - see my other repo https://github.com/lukes-code/Movie-Mash for example).

## How to setup

1. Install with npm i
2. Start Websocket server locally
   2.1 Go to the directory that websocketServer.js lives in
   2.2 run this command in the terminal:
   node websocketServer.js
3. Run locally with npm run dev once websocket server is running

## Tech used

Next.js (page router)
TypeScript
Tailwind
Redux
Websockets
Jest / React testing library

Notable packages:
react-loading-skeleton
react-toastify
socket.io-clien

Removed axios for fetch (no need for the package install here)

## How to test

Run the command:
npm test

## Video of app

[screen-capture (2).webm](https://github.com/user-attachments/assets/8fef57f5-e673-4acd-a325-b8a40d77cf3d)
