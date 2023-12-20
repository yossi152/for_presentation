

export function ReturnProgressBar ({pageNum}) {
    const allPages = 9;
    const progress = 100 / allPages * pageNum;
    return (
        <>
        <div className="progress mb-3 mt-1">
            <div className="progress-bar" role="progressbar" style={{width: progress + "%"}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        </>
    )
}