const vscode = require('vscode');

function getReference(editor) {
  const uri = editor.document.uri;
  // Get workspace-relative path and normalize to forward slashes
  let rel = vscode.workspace.asRelativePath(uri, false).replace(/\\/g, '/');
  const sel = editor.selection;

  // No selection -> use active line
  if (!sel || sel.isEmpty) {
    const line = editor.selection.active.line + 1;
    return `${rel}:${line}`;
  }

  const start = sel.start.line + 1;
  const end = sel.end.line + 1;

  // If selection is within a single line, only emit that one line number
  if (start === end) {
    return `${rel}:${start}`;
  }

  return `${rel}:${start}-${end}`;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand('copyReference.copy', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor');
      return;
    }
    try {
      const ref = getReference(editor);
      await vscode.env.clipboard.writeText(ref);
      vscode.window.setStatusBarMessage(`Copied: ${ref}`, 2000);
    } catch (err) {
      console.error(err);
      vscode.window.showErrorMessage('Failed to copy reference');
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
