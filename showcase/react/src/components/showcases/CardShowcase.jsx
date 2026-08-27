import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@fw-components/react/src/Card';
import Button from '@fw-components/react/src/Button';

function CardShowcase() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Card</h1>
        <p className="text-muted-foreground">
          Displays a card with header, content, and footer.
        </p>
      </div>

      <ShowcaseSection
        title="Examples"
        description="Different card layouts and styles"
      >
        <VariantSection title="Default">
          <div className="w-full max-w-md">
            <Card>
              <CardContent className="pt-6">
                <CardTitle className="mb-2">Card Title</CardTitle>
                <CardDescription>
                  Card description goes here. This is a basic card component.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </VariantSection>

        <VariantSection title="With Header and Footer">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Card Header</CardTitle>
                <CardDescription>Card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This card has a header and footer section with action buttons.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outlined">Cancel</Button>
                <Button theme="primary" variant="filled">Deploy</Button>
              </CardFooter>
            </Card>
          </div>
        </VariantSection>

        <VariantSection title="Card Grid">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">📊</div>
                  <CardTitle className="mb-2">Card {i}</CardTitle>
                  <CardDescription>
                    Description for card number {i}.
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default CardShowcase;
