import Link from 'next/link';

export default function CLIPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Link
            href="/docs"
            className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            ← Back to Documentation
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Multi UI CLI Guide</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Learn how to use the Multi UI CLI tool to easily install and manage components in your project.
        </p>
      </div>

      <div className="prose prose-gray max-w-none dark:prose-invert">
        <section id="installation" className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Installation</h2>
          <p>
            First, install the Multi UI CLI globally or in your project:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npm install @omsalunke0852/multi-ui-cli</pre>
          </div>
          <p>
            This will make the <code>multi-ui</code> command available for use in your terminal.
          </p>
        </section>

        <section id="setup" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Setting Up Your Project</h2>
          <p>
            After installing the CLI, you need to initialize Multi UI in your project:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui setup</pre>
          </div>
          <p>
            This command will:
          </p>
          <ul>
            <li>Create necessary config files for Multi UI</li>
            <li>Set up required dependencies</li>
            <li>Configure your project to use Multi UI components</li>
          </ul>
        </section>

        <section id="adding-components" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Adding Components</h2>
          <p>
            To add a component to your project, use the <code>add</code> command followed by the component name:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui add ComponentName_1</pre>
          </div>
          <p>
            This will:
          </p>
          <ul>
            <li>Download the component from the Multi UI repository</li>
            <li>Install any required dependencies</li>
            <li>Add the component to your project</li>
            <li>Configure the component for immediate use</li>
          </ul>
          <p>
            You can add multiple components in one command:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui add ComponentName_1 ComponentName_2 ComponentName_3</pre>
          </div>
        </section>

        <section id="listing-components" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Listing Available Components</h2>
          <p>
            To see all available components that you can add to your project:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui list</pre>
          </div>
          <p>
            This will display a list of all components available in the Multi UI repository.
          </p>
        </section>

        <section id="updating-components" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Updating Components</h2>
          <p>
            To update a component that you've already added to your project:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui update ComponentName_1</pre>
          </div>
          <p>
            This will fetch the latest version of the component from the repository and update your local copy.
          </p>
        </section>

        <section id="help" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Getting Help</h2>
          <p>
            For more information on available commands and options:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui --help</pre>
          </div>
          <p>
            You can also get help for specific commands:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui add --help</pre>
          </div>
        </section>
      </div>

      <div className="rounded-lg bg-primary-50 p-6 dark:bg-primary-900/20">
        <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-300">Troubleshooting</h3>
        <p className="mt-2 text-primary-700 dark:text-primary-400">
          If you encounter any issues while using the Multi UI CLI, please check the documentation or reach out to our support team.
        </p>
      </div>
    </div>
  );
} 