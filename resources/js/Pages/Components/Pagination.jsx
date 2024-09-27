import React from "react";

export default function Pagination({ totalPages, page, handlePageChange }) {
    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
        />
    );
}
