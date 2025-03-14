import { useLocation } from "react-router";
import Editor from "../editor/editor";

const FormGenerator = () => {

  const location = useLocation();
  const selectedRows = location.state?.rows || [];

  return (
    <div>
      <Editor data={selectedRows} />
    </div>
  )
}

export default FormGenerator