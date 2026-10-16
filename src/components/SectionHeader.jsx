import Reveal from "./Reveal";

export default function SectionHeader({ eyebrow, title, lead, center = true }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-heading mt-5">{title}</h2>
      {lead && <p className={`section-lead ${center ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}
