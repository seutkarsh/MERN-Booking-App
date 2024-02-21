import React from 'react'
import { hotelTypes } from '../config/hotel-options-config'

interface IProps {
    selectedTypes: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const HotelTypeFilter = ({
    selectedTypes,
    onChange,
}: IProps): React.ReactElement => {
    return (
        <div className="border-b border-slate-300 p-5">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            {hotelTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        value={type}
                        checked={selectedTypes.includes(type)}
                        onChange={onChange}
                    />
                    <span>{type}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelTypeFilter
