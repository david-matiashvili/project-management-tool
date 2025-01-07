import React from 'react';
import {Link} from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <div className={"mt-10"}>
                    <Link
                        to="/"
                        className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
