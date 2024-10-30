import { Link } from "react-router-dom";


const StatsCard = ({ title, value, icon: Icon, trend, bgColor }) => {
    return (
        <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-black text-sm">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    {title === "Total Students" ? (
                        <Link to="students" className="text-white text-sm hover:underline">
                            View Students {'→'}
                        </Link>
                    ) : (
                        trend && (
                            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
                            </p>
                        )
                    )}
                </div>
                <Icon className="h-8 w-8 text-blue-500" />
            </div>
        </div>
    )

};

export default StatsCard;