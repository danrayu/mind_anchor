interface CollapseProps {
  title: string;
  description: string;
}
function Collapse({title, description}: CollapseProps) {
  return (
    <div className="collapse bg-base-200">
  <input type="checkbox" /> 
  <div className="collapse-title text-xl font-medium">
    {title}
  </div>
  <div className="collapse-content"> 
    <p>{description}</p>
  </div>
</div>
  )
}

export default Collapse