import React from 'react'
import { hotelFacilities } from '../config/hotel-options-config'

interface IProps {
    selectedFacilities: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const FacilityFilter = ({
    selectedFacilities,
    onChange,
}: IProps): React.ReactElement => {
    return (
        <div className="border-b border-slate-300 p-5">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            {hotelFacilities.map((facility) => (
                <label key={facility} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        value={facility}
                        checked={selectedFacilities.includes(facility)}
                        onChange={onChange}
                    />
                    <span>{facility}</span>
                </label>
            ))}
        </div>
    )
}

export default FacilityFilter
