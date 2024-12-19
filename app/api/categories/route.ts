import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, keywords, keyFeatures, language } = body;

    // Validation des données
    if (!name || !keywords || !keyFeatures || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Ici, vous pouvez ajouter la logique pour sauvegarder dans votre base de données
    // Pour l'instant, on simule une réponse réussie
    return NextResponse.json(
      { 
        message: 'Category created successfully',
        data: { name, keywords, keyFeatures, language }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error processing category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
