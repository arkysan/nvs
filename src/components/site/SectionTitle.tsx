export function SectionTitle({
  title,
  children,
  titleField,
  copyField,
}: {
  title: string;
  children?: React.ReactNode;
  titleField?: string;
  copyField?: string;
}) {
  return (
    <div className="section-title">
      <h2 data-field={titleField}>{title}</h2>
      {children ? <p data-field={copyField}>{children}</p> : null}
    </div>
  );
}
