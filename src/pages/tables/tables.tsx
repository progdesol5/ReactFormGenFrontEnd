import { useTables } from "@/providers";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const Tables = () => {
  const { tables, fetchTables } = useTables();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const query = useQuery();
  const currentDemo = query.get("demo") || "demo1";

  useEffect(() => {
    const loadTables = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchTables();
      } catch (error) {
        setError("Failed to load tables.");
      }
      finally {
        setLoading(false);
      }
    };
    loadTables();
  }, [fetchTables]);

  return (
    <div className="text-center container-fluid">
      <h1 className="text-3xl p-6">All Tables</h1>
      <hr className="mb-6" />
      <div className="flex flex-col items-center justify-center">
        {loading ? (
          <div className="w-full h-16 relative flex items-center justify-center"><CircularProgress /></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              {tables?.map((table: string) => (
                <div className="card md:w-[45%] w-full" key={table}>
                  <Link to={`/table?demo=${currentDemo}&tableName=${table}`}>
                    <div className="card-header">
                      <h3 className="card-title">{table}</h3>
                    </div>
                    <div className="card-body">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis facilis porro repellendus ullam nisi
                      repudiandae mollitia, vitae neque quas, suscipit consectetur harum maxime, consequatur sit sint dolorem
                      nostrum velit! Unde.
                    </div>
                  </Link>
                  <div className="card-footer justify-end gap-4">
                    <button className="btn btn-outline btn-primary">
                      <Link to={`/table?demo=${currentDemo}&tableName=${table}`}>Edit</Link>
                    </button>
                    <button className="btn btn-outline btn-danger">
                      <Link to={`/table?demo=${currentDemo}&tableName=${table}`}>Delete</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export { Tables };

