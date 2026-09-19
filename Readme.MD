# ThinkStack

ThinkStack is an AI-powered document management and
question-answering platform built with Django, React and RAG.

## Features

- User authentication
- Workspace management
- Document upload
- PDF, DOCX and TXT support
- Document processing
- AI-powered document Q&A
- Workspace-based document organization
- RAG-based semantic search

## Tech Stack

### Frontend
- React
- Tailwind CSS

### Backend
- Django
- Django REST Framework

### AI / RAG
- LangChain
- Google Gemini
- ChromaDB
- Embeddings

## RAG Architecture

Document
   ↓
Parser
   ↓
Chunking
   ↓
Embeddings
   ↓
ChromaDB
   ↓
Retriever
   ↓
Context
   ↓
Gemini
   ↓
Answer

## Project Structure

ThinkStack/
├── accounts/
├── workspace/
├── documents/
├── AI/
│   ├── services/
│   ├── embeddings/
│   ├── vectorstore/
│   ├── retriever/
│   ├── llm/
│   ├── prompts/
│   └── rag.py
└── frontend/

## Current Status

🚧 Project under active development.

### Completed
- Document parsing
- Document chunking
- Metadata handling
- Workspace-based Chroma collections
- Embeddings
- Vector retrieval
- RAG pipeline foundation

### In Progress
- Document-specific chat
- Workspace chat
- Source/page references
- Frontend AI chat interface

## Future Improvements

- Chat history
- Better source citations
- Streaming responses
- Improved document processing
- Advanced retrieval techniques