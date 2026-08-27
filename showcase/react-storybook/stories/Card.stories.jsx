import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@fw-components/react/src/Card';
import Button from '@fw-components/react/src/Button';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can put any content here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Confirmation</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This action cannot be undone. Please confirm your choice.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button title="Cancel" variant="outline" theme="secondary" />
        <Button title="Confirm" variant="filled" theme="primary" />
      </CardFooter>
    </Card>
  ),
};

export const SimpleContent = {
  render: () => (
    <Card className="w-96">
      <CardContent className="pt-6">
        <p className="text-center">Simple card with just content</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage = {
  render: () => (
    <Card className="w-96 overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500" />
      <CardHeader>
        <CardTitle>Beautiful Card</CardTitle>
        <CardDescription>With a colorful header</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card includes a visual header using a gradient background.</p>
      </CardContent>
    </Card>
  ),
};

export const Dashboard = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-4xl">$45,231.89</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">+20.1% from last month</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-4xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">+180 since last week</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Conversion Rate</CardDescription>
          <CardTitle className="text-4xl">3.2%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">+0.5% from last month</div>
        </CardContent>
      </Card>
    </div>
  ),
};
