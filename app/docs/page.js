import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Documentation</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Learn how to install and use Multi UI components in your projects.
        </p>
      </div>

      <div className="prose prose-gray max-w-none dark:prose-invert">
        <section id="installation" className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Installation</h2>
          <p>
            The easiest way to get started with Multi UI is by using our CLI tool.
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npm install @omsalunke0852/multi-ui-cli</pre>
          </div>
          <p>
            After installing the CLI, run the setup command to initialize Multi UI in your project:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui setup</pre>
          </div>
          <p>
            This will set up the necessary configuration for using Multi UI components in your project.
          </p>
          <p className="mt-6">
            You can also install individual components as npm packages if you prefer:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npm install @multi-ui/[category]-[component]</pre>
          </div>
          <p>
            For example, to install a button component from the forms category:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npm install @multi-ui/forms-button</pre>
          </div>
          <p>
            You can browse all available components in the{' '}
            <Link href="/components" className="text-primary-600 hover:underline dark:text-primary-400">
              Components
            </Link>{' '}
            section.
          </p>
        </section>

        <section id="usage" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Usage</h2>
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Using the CLI</h3>
          <p>
            The recommended way to add components to your project is using the CLI:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">npx multi-ui add ComponentName_1</pre>
          </div>
          <p>
            This command will add the specified component to your project, including all necessary dependencies and styles.
          </p>
          
          <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">Importing Components</h3>
          <p>
            If you installed a component through npm or the CLI, you can import and use it in your React application:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">{`import { Button } from '@multi-ui/forms-button';

function MyComponent() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
    </div>
  );
}`}</pre>
          </div>
          <p>
            Each component comes with its own set of props and customization options. Refer to the individual
            component documentation for details.
          </p>
        </section>

        <section id="customization" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Customization</h2>
          <p>
            Multi UI components are built with customization in mind. Most components accept custom className
            props for styling:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">{`import { Card } from '@multi-ui/layout-card';

function MyComponent() {
  return (
    <Card className="bg-blue-100 shadow-xl">
      <h2>Custom Styled Card</h2>
      <p>This card has custom background and shadow.</p>
    </Card>
  );
}`}</pre>
          </div>
          <p>
            You can also customize components using Tailwind CSS utility classes directly in your code.
          </p>
        </section>

        <section id="themes" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Theme Support</h2>
          <p>
            Multi UI components support light and dark themes out of the box. To enable theme switching in your
            application, you can use next-themes:
          </p>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="font-mono text-sm">{`// _app.js or layout.js
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}`}</pre>
          </div>
          <p>
            Components will automatically adapt to the current theme, using appropriate color schemes and styling.
          </p>
        </section>

        <section id="cli-commands" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">CLI Commands Reference</h2>
          <p>
            The Multi UI CLI provides several commands to help you work with components:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">npx multi-ui setup</code>
              <span className="ml-2">Initialize Multi UI in your project</span>
            </li>
            <li>
              <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">npx multi-ui add ComponentName_1</code>
              <span className="ml-2">Add a specific component to your project</span>
            </li>
            <li>
              <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">npx multi-ui list</code>
              <span className="ml-2">List all available components</span>
            </li>
          </ul>
          <p className="mt-4">
            For detailed instructions on using the CLI, check out our{' '}
            <Link href="/docs/cli" className="text-primary-600 hover:underline dark:text-primary-400">
              CLI Guide
            </Link>
            .
          </p>
        </section>

        <section id="advanced" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Advanced Usage</h2>
          <p>
            For more advanced customization, you can copy the component code directly from GitHub and modify it to
            fit your specific needs.
          </p>
          <p>
            Each component page includes the full source code, which you can use as a starting point for your own
            implementation.
          </p>
        </section>

        <section id="contributing" className="space-y-4 pt-8">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Contributing</h2>
          <p>
            We welcome contributions to the Multi UI component library! If you have ideas for new components or
            improvements to existing ones, please check out our GitHub repository.
          </p>
        </section>
      </div>

      <div className="rounded-lg bg-primary-50 p-6 dark:bg-primary-900/20">
        <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-300">Need Help?</h3>
        <p className="mt-2 text-primary-700 dark:text-primary-400">
          If you have any questions or need assistance, feel free to open an issue on GitHub or reach out to our
          community.
        </p>
      </div>
    </div>
  );
} 