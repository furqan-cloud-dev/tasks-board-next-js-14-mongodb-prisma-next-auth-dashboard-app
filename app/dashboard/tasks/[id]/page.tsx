import React from 'react'

export default function SingleTaskPage({ params }: { params: any }) {
    const { id } = params;

    return (
        <div>
            taskId: {id}
        </div>
    )
}
