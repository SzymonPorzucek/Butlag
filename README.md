# ButLag

## About

**ButLag** is a web application designed to help users create shopping lists with products available in major Norwegian stores. It's a front-end project that utilizes `localStorage` to save shopping lists and `sessionStorage` to manage user data.

The project is live and accessible online at [butlag.com](https://butlag.com/).

### Technologies Used

- **Front-end**: HTML, SCSS, Tailwind CSS, JavaScript
- **Data Storage**: `localStorage`, `sessionStorage`
- **Back-end**: PHP (used in the contact section)
- **Task Runner**: Gulp (for automating development tasks such as CSS minification, JavaScript bundling, and live reloading)

### Live Version

The live version of the application is hosted at [butlag.com](https://butlag.com/). The contact section of the website is managed using PHP to handle form submissions and communications.

Note: The PHP code is not included in the repository.

## Installation

To run this project locally:

1. Clone the repository:

```bash
  git clone https://github.com/SzymonPorzucek/Butlag.git
```

2. Navigate to the project directory:

```bash
   cd Butlag
```

3. Install Node.js and NPM:

   - If you don't have Node.js and NPM installed, you can download and install them from the [official Node.js website](https://nodejs.org).
   - After installing Node.js, verify the installation by running the following commands in your terminal:

   ```bash
   node -v
   npm -v
   ```

   These commands should output the versions of Node.js and NPM, confirming that they are installed correctly.

4. Install project dependencies:

   ```bash
   npm install
   ```

   - **Note**: If you encounter issues with the versions of Rollup or Gulp, you can force the installation of dependencies by using:
     ```bash
     npm install --force
     ```

5. Run the development server:

```bash
gulp
```
