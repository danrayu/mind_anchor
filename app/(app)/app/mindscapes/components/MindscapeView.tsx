"use client";
import Breadcrumbs from "../../components/Breadcrumbs";
import DnDMemeDisplay from "../../components/dnd/DnDMemeDisplay";
import Collapse from "../../components/utility/Collapse";

interface MindscapeViewProps {
  mindscape: Mindscape;
}

function MindscapeView({ mindscape }: MindscapeViewProps) {
  const breadcrumbs = [{ label: "Mindscapes" }, { label: mindscape.title }];

  return (
    <div className="mt-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap">
        <h1 className="text-[35px] font-bold">{mindscape.title}</h1>
        <Collapse title="Description" description={mindscape.description} />
      </div>

      <DnDMemeDisplay/>
    </div>
  );
}

export default MindscapeView;
