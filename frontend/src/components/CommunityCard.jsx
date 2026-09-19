import { useNavigate } from "react-router-dom";

function CommunityCard({ community }) {

    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition">


            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                    <h3 className="text-lg font-semibold text-[#24303A] truncate">
                        {community.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {community.location}
                    </p>

                </div>

                <span className="shrink-0 text-xs font-medium text-[#2F6F73] bg-[#E8F1F0] px-2.5 py-1 rounded-full capitalize">
                    {community.category}
                </span>

            </div>



            <p className="text-sm text-gray-500 leading-relaxed mt-4 line-clamp-2 min-h-[40px]">
                {community.description || "A community for people from this hometown."}
            </p>


     

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                <span className="text-sm text-gray-500">
                    {community.member_count} members
                </span>

                <button
                    onClick={() => navigate(`/community/${community.id}`)}
                    className="text-sm font-medium text-[#2F6F73] hover:text-[#285F63] transition"
                >
                    View community →
                </button>

            </div>

        </div>
    );
}

export default CommunityCard;