export default function CodeBlock({ code, children }) {
  return (
    <pre className="code">
      <code>{children ?? code}</code>
    </pre>
  );
}
