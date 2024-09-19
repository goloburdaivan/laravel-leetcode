import React from 'react';

const Pagination = ({ links }) => {
    return (
        <div className="mt-6">
            <nav className="flex justify-center">
                <ul className="inline-flex -space-x-px">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.url ? link.url : '#'}
                                className={`px-3 py-2 border ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
