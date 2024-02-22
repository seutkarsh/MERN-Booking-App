import React from 'react'

interface IProps {
    selectedPrice?: number
    onChange: (value?: number) => void
}
const PriceFilter = ({
    selectedPrice,
    onChange,
}: IProps): React.ReactElement => {
    return (
        <div className="text-md font-semibold md-2">
            <h4 className="text-md font-semibold md-2">Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice}
                onChange={(event) =>
                    onChange(
                        event.target.value
                            ? parseInt(event.target.value)
                            : undefined
                    )
                }
            >
                <option value="">Select Max Price</option>
                {[500, 1000, 1500, 2000, 2500, 3000].map((price) => (
                    <option key={price} value={price}>
                        {price}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default PriceFilter
