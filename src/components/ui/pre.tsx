import { cn } from "@/lib/utils";
import { Highlight, themes } from "prism-react-renderer";

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string;
  code?: string;
}

export function Pre({ children, language, code, className, ...props }: PreProps) {
  if (code) {
    return (
      <Highlight
        theme={themes.vsDark}
        code={code}
        language={language || "typescript"}
      >
        {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              "rounded-lg p-4 overflow-x-auto text-sm",
              preClassName,
              className
            )}
            style={style}
            {...props}
          >
            {language && (
              <div className="mb-2 text-xs text-muted-foreground">{language}</div>
            )}
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }

  return (
    <pre
      className={cn(
        "rounded-lg bg-muted p-4 overflow-x-auto",
        className
      )}
      {...props}
    >
      {language && (
        <div className="mb-2 text-sm text-muted-foreground">{language}</div>
      )}
      <code>{children}</code>
    </pre>
  );
} 
