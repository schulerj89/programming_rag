# programming_rag
Create an AI RAG (Retrieval-Augmented Generation) for programming languages.

## Overview

This project demonstrates how to create and use a local vector store with embeddings generated from programming language texts. It utilizes the OpenAI API for generating embeddings and the Faiss vector store for storing and retrieving these embeddings.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)
- OpenAI API key

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/programming_rag.git
    cd programming_rag
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
    ```plaintext
    OPENAI_API_KEY=your_openai_api_key
    ```

## Usage

1. Create and save the vector store:
    ```sh
    node vector.js
    ```

    This script initializes the vector store with predefined texts, generates embeddings using OpenAI's API, and saves the vector store locally.

2. Start the server:
    ```sh
    node server.js
    ```

    This will start the server on port 5000.

3. Use the client to interact with the server:
    - Open your browser and go to `http://localhost:5000`
    - Use the input box to send queries to the AI, which will retrieve relevant context from the vector store and generate responses using OpenAI's API.

## Scripts

- `vector.js`: Initializes and saves the vector store.
- `server.js`: Sets up the server to handle API requests.
- `src/App.js`: React component for the chat interface.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

