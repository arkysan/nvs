export function SectionTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
