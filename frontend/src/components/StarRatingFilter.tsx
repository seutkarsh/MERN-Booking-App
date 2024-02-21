import React from 'react'

interface IProps {
    selectedStars: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const StarRatingFilter = ({
    selectedStars,
    onChange,
}: IProps): React.ReactElement => {
    return (
        <div className="border-b border-slate-300 p-5">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            {['5', '4', '3', '2', '1'].map((star) => (
                <label key={star} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        value={star}
                        checked={selectedStars.includes(star)}
                        onChange={onChange}
                    />
                    <span>{star} Stars</span>
                </label>
            ))}
        </div>
    )
}

export default StarRatingFilter
