Business & Tourism Directory (Frontend)




Project Overview

This project is a modern, fully responsive frontend for a Business & Tourism Directory website, develope using React.js, Vite, and Tailwind CSS. The website relies entirely on dynamic data fetching from a Supabase database.

Key Features

•
Homepage: Features an advanced search engine and a filter bar sorted by Category and Location.

•
Directory Cards Grid: Attractive display of listing cards with smooth animations using framer-motion.

•
Listing Detail Page: A dedicated page for each listing showcasing all fetched data from Supabase, complete with a direct call CTA button and a website link.

•
Dynamic Data Fetching: All data is fetched directly from Supabase using a custom hook (useFetchListings).

Technologies Used

•
React.js: A JavaScript library for building user interfaces.

•
Vite: A fast build tool for web projects.

•
Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

•
Supabase: An open-source platform providing PostgreSQL database, authentication, and real-time subscriptions.

•
@supabase/supabase-js: JavaScript library for interacting with Supabase.

•
framer-motion: A React library for creating smooth animations and interactions.

Development Environment Setup

To set up and run the project locally, follow these steps:

1. Clone the Repository

Bash


git clone <your_repository_url_here>
cd <your_project_name>



2. Install Dependencies

Bash


pnpm install
# or npm install
# or yarn install



3. Supabase Setup

3.1. Create a Supabase Project

If you don't already have a Supabase project, create one through the Supabase dashboard 1.

3.2. Database Setup (SQL Schema)

You must apply the following database schema to your Supabase project. You can do this by navigating to the SQL Editor section in your Supabase dashboard and running the commands found in the schema.sql file.

schema.sql file:

SQL


-- SQL Schema for Supabase

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for the listings table
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous read access
CREATE POLICY "Enable read access for all users" ON listings FOR SELECT USING (TRUE);



Note: Row Level Security (RLS) has been enabled, and a policy allowing read access for all users has been created. Ensure you understand the security implications before deploying to a production environment.

4. Environment Variables Setup

Create a .env file in the project root and populate it with the following information. You can find these keys in your Supabase project settings (Settings -> API).

Plain Text


VITE_SUPABASE_URL="https://your-supabase-url.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"



Important: Never embed actual API keys directly into your source code. Always use environment variables.

Running the Project

After setting up all variables and dependencies, you can run the project in development mode:

Bash


pnpm dev
# or npm run dev
# or yarn dev



The application will typically run on http://localhost:5173 (or another available port ).

Project Structure (Summary)

Plain Text


.env
public/
src/
├── assets/
├── components/         # Frontend components (e.g., ListingCard, SearchBar)
├── hooks/              # Custom hooks (e.g., useFetchListings)
├── pages/              # Application pages (e.g., HomePage, ListingDetailPage)
├── App.jsx
├── main.jsx
├── index.css
└── supabaseClient.js   # Supabase client setup
package.json
tailwind.config.js
vite.config.js



Data Fetching Methodology (useFetchListings)

A custom hook named useFetchListings will be used to fetch data from the listings table in Supabase. This hook will be responsible for:

•
Initiating the data fetching process.

•
Managing the loading state.

•
Handling errors.

•
Returning the fetched data.

Example Usage (Conceptual):

JavaScript


// hooks/useFetchListings.js
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure correct path to client file

const useFetchListings = (category = null, location = null) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        let query = supabase.from('listings').select('*');

        if (category) {
          query = query.eq('category', category);
        }
        if (location) {
          query = query.eq('location', location);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category, location]);

  return { listings, loading, error };
};

export default useFetchListings;



Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1.
Fork the repository.

2.
Create a new feature branch (git checkout -b feature/AmazingFeature).

3.
Make your changes.

4.
Test your changes.

5.
Commit your changes (git commit -m 'Add some AmazingFeature').

6.
Push to the branch (git push origin feature/AmazingFeature).

7.
Open a Pull Request.