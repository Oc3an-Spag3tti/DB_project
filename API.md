# API pour la gestion des clients

## **1. Créer un nouveau client**

**POST** `/clients`

### Paramètres de la requête (Corps JSON) :

```json
{
  "nom": "string",
  "adresse": "string",
  "contact": "string"
}
```

### Réponse (succès) :

- **Code 200**

```json
{
  "id": 1
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X POST http://localhost:3000/clients \
-H "Content-Type: application/json" \
-d '{
  "nom": "John Doe",
  "adresse": "123 Main Street",
  "contact": "+1234567890"
}'
```

---

## **2. Obtenir la liste de tous les clients**

**GET** `/clients`

### Paramètres de la requête : aucun

### Réponse (succès) :

- **Code 200**

```json
{
  "data": [
    {
      "id": 1,
      "nom": "John Doe",
      "adresse": "123 Main Street",
      "contact": "+1234567890"
    },
    {
      "id": 2,
      "nom": "Jane Smith",
      "adresse": "456 Elm Street",
      "contact": "+0987654321"
    }
  ]
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X GET http://localhost:3000/clients
```

---

## **3. Obtenir un client par ID**

**GET** `/clients/:id`

### Paramètres URL :

- `id` (integer) : ID du client

### Réponse (succès) :

- **Code 200**

```json
{
  "data": {
    "id": 1,
    "nom": "John Doe",
    "adresse": "123 Main Street",
    "contact": "+1234567890"
  }
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

- **Code 404**

```json
{
  "error": "Client non trouvé"
}
```

### Exemple d'appel :

```bash
curl -X GET http://localhost:3000/clients/1
```

---

## **4. Mettre à jour les données d'un client**

**PUT** `/clients/:id`

### Paramètres URL :

- `id` (integer) : ID du client

### Paramètres de la requête (Corps JSON) :

```json
{
  "nom": "string",
  "adresse": "string",
  "contact": "string"
}
```

### Réponse (succès) :

- **Code 200**

```json
{
  "changes": 1
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X PUT http://localhost:3000/clients/1 \
-H "Content-Type: application/json" \
-d '{
  "nom": "John Updated",
  "adresse": "789 Maple Avenue",
  "contact": "+1112223333"
}'
```

---

## **5. Supprimer un client**

**DELETE** `/clients/:id`

### Paramètres URL :

- `id` (integer) : ID du client

### Réponse (succès) :

- **Code 200**

```json
{
  "changes": 1
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X DELETE http://localhost:3000/clients/1
```

---

## **6. Obtenir les commandes d'un client**

**GET** `/clients/:id/commandes`

### Paramètres URL :

- `id` (integer) : ID du client

### Réponse (succès) :

- **Code 200**

```json
[
  {
    "id": 1,
    "client_id": 1,
    "produit": "Produit A",
    "quantite": 2,
    "prix": 100
  },
  {
    "id": 2,
    "client_id": 1,
    "produit": "Produit B",
    "quantite": 1,
    "prix": 50
  }
]
```

### Réponse (erreur) :

- **Code 500**

```json
{
  "error": "Erreur lors de la récupération des commandes du client."
}
```

### Exemple d'appel :

```bash
curl -X GET http://localhost:3000/clients/1/commandes
```

---

## API pour la gestion des catégories

## **1. Créer une nouvelle catégorie**

**POST** `/categories`

### Paramètres de la requête (Corps JSON) :

```json
{
  "nom": "string"
}
```

### Réponse (succès) :

- **Code 200**

```json
{
  "id": 1
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X POST http://localhost:3000/categories \
-H "Content-Type: application/json" \
-d '{
  "nom": "Électronique"
}'
```

---

## **2. Obtenir la liste de toutes les catégories**

**GET** `/categories`

### Paramètres de la requête : aucun

### Réponse (succès) :

- **Code 200**

```json
{
  "data": [
    {
      "id": 1,
      "nom": "Électronique"
    },
    {
      "id": 2,
      "nom": "Maison"
    }
  ]
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X GET http://localhost:3000/categories
```

---

## **3. Obtenir une catégorie par ID**

**GET** `/categories/:id`

### Paramètres URL :

- `id` (integer) : ID de la catégorie

### Réponse (succès) :

- **Code 200**

```json
{
  "data": {
    "id": 1,
    "nom": "Électronique"
  }
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

- **Code 404**

```json
{
  "error": "Catégorie non trouvée"
}
```

### Exemple d'appel :

```bash
curl -X GET http://localhost:3000/categories/1
```

---

## **4. Mettre à jour une catégorie**

**PUT** `/categories/:id`

### Paramètres URL :

- `id` (integer) : ID de la catégorie

### Paramètres de la requête (Corps JSON) :

```json
{
  "nom": "string"
}
```

### Réponse (succès) :

- **Code 200**

```json
{
  "changes": 1
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X PUT http://localhost:3000/categories/1 \
-H "Content-Type: application/json" \
-d '{
  "nom": "Nouveau nom"
}'
```

---

## **5. Supprimer une catégorie**

**DELETE** `/categories/:id`

### Paramètres URL :

- `id` (integer) : ID de la catégorie

### Réponse (succès) :

- **Code 200**

```json
{
  "changes": 1
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Description de l'erreur"
}
```

### Exemple d'appel :

```bash
curl -X DELETE http://localhost:3000/categories/1

Voici une version mise en forme claire et structurée de l'API pour la gestion des commandes, similaire à votre exemple précédent :

---
```

## API pour la gestion des commandes

## **1. Créer une nouvelle commande**

**POST** `/commandes`

### Paramètres de la requête (Corps JSON):

```json
{
  "client_id": "integer",
  "produits": [
    {
      "id": "integer",
      "quantite": "integer",
      "prix_unitaire": "float"
    }
  ]
}
```

### Réponse (succès) :

- **Code 201**

```json
{
  "message": "Order created successfully."
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Client ID and products are required."
}
```

- **Code 500**

```json
{
  "error": "Error checking product stock."
}
```

### Exemple d'appel :

```bash
curl -X POST http://localhost:3000/commandes \
-H "Content-Type: application/json" \
-d '{
  "client_id": 1,
  "produits": [
    {
      "id": 1,
      "quantite": 2,
      "prix_unitaire": 100.5
    },
    {
      "id": 2,
      "quantite": 1,
      "prix_unitaire": 50.0
    }
  ]
}'
```

---

## **2. Obtenir la liste de toutes les commandes**

**GET** `/commandes`

### Paramètres de la requête (Query String) :

- `start` (optionnel) : Date de début (format `YYYY-MM-DD`)
- `end` (optionnel) : Date de fin (format `YYYY-MM-DD`)

### Réponse (succès) :

- **Code 200**

```json
{
  "data": [
    {
      "id": 1,
      "date_commande": "2025-01-01",
      "client_id": 1,
      "status": "en cours"
    },
    {
      "id": 2,
      "date_commande": "2025-01-02",
      "client_id": 2,
      "status": "livrée"
    }
  ]
}
```

### Réponse (erreur) :

- **Code 500**

```json
{
  "error": "Error retrieving orders."
}
```

### Exemple d'appel :

```bash
curl -X GET "http://localhost:3000/commandes?start=2025-01-01&end=2025-01-31"
```

---

## **3. Obtenir une commande par ID**

**GET** `/commandes/:id`

### Paramètres URL :

- `id` (integer) : ID de la commande

### Réponse (succès) :

- **Code 200**

```json
{
  "data": {
    "id": 1,
    "date_commande": "2025-01-01",
    "client_id": 1,
    "status": "en cours"
  }
}
```

### Réponse (erreur) :

- **Code 404**

```json
{
  "error": "Order not found."
}
```

- **Code 500**

```json
{
  "error": "Error retrieving the order."
}
```

### Exemple d'appel :

```bash
curl -X GET http://localhost:3000/commandes/1
```

---

## **4. Mettre à jour une commande**

**PUT** `/commandes/:id`

### Paramètres URL :

- `id` (integer) : ID de la commande

### Paramètres de la requête (Corps JSON) :

```json
{
  "client_id": "integer",
  "produits": [
    {
      "id": "integer",
      "quantite": "integer",
      "prix_unitaire": "float"
    }
  ]
}
```

### Réponse (succès) :

- **Code 200**

```json
{
  "message": "Order updated successfully."
}
```

### Réponse (erreur) :

- **Code 400**

```json
{
  "error": "Client ID and products are required."
}
```

- **Code 500**

```json
{
  "error": "Error updating the order."
}
```

### Exemple d'appel :

```bash
curl -X PUT http://localhost:3000/commandes/1 \
-H "Content-Type: application/json" \
-d '{
  "client_id": 1,
  "produits": [
    {
      "id": 1,
      "quantite": 3,
      "prix_unitaire": 100.5
    }
  ]
}'
```

---

## **5. Supprimer une commande**

**DELETE** `/commandes/:id`

### Paramètres URL :

- `id` (integer) : ID de la commande

### Réponse (succès) :

- **Code 200**

```json
{
  "message": "Order deleted successfully."
}
```

### Réponse (erreur) :

- **Code 404**

```json
{
  "error": "Order not found."
}
```

- **Code 500**

```json
{
  "error": "Error deleting the order."
}
```

### Exemple d'appel :

```bash
curl -X DELETE http://localhost:3000/commandes/1
```

---

## API Documentation pour la gestion des produits

## 1. **Créer un produit**

- **URL**: `/produits`
- **Méthode**: `POST`
- **Description**: Cette API permet de créer un nouveau produit dans la base de données.
- **Corps de la requête (Request Body)**:
  ```json
  {
    "nom": "Nom du produit",
    "description": "Description du produit",
    "prix_unitaire": 10.99,
    "quantite_stock": 100,
    "categorie_id": 1
  }
  ```
- **Réponse (Response)**:
  - **Code**: `201 Created`
  - **Corps de la réponse**:
  ```json
  {
    "id": 1
  }
  ```
  - **Code**: `400 Bad Request` (si des champs sont manquants)
  - **Corps de la réponse**:
  ```json
  {
    "error": "Missing required fields"
  }
  ```
  - **Code**: `500 Internal Server Error` (en cas d'erreur serveur)

---

## 2. **Obtenir tous les produits**

- **URL**: `/produits`
- **Méthode**: `GET`
- **Description**: Cette API permet de récupérer la liste de tous les produits.
- **Réponse (Response)**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "nom": "Produit A",
        "description": "Description A",
        "prix_unitaire": 10.99,
        "quantite_stock": 100,
        "categorie_id": 1
      },
      {
        "id": 2,
        "nom": "Produit B",
        "description": "Description B",
        "prix_unitaire": 20.5,
        "quantite_stock": 50,
        "categorie_id": 2
      }
    ]
  }
  ```
  - **Code**: `400 Bad Request` (en cas d'erreur de récupération)

---

## 3. **Obtenir un produit par ID**

- **URL**: `/produits/:id`
- **Méthode**: `GET`
- **Description**: Cette API permet de récupérer les détails d'un produit spécifique en utilisant son ID.
- **Paramètres de l'URL**:
  - `id`: L'ID du produit que vous voulez récupérer.
- **Réponse (Response)**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
  ```json
  {
    "data": {
      "id": 1,
      "nom": "Produit A",
      "description": "Description A",
      "prix_unitaire": 10.99,
      "quantite_stock": 100,
      "categorie_id": 1
    }
  }
  ```
  - **Code**: `404 Not Found` (si le produit n'existe pas)

---

## 4. **Mettre à jour un produit**

- **URL**: `/produits/:id`
- **Méthode**: `PUT`
- **Description**: Cette API permet de mettre à jour un produit existant en fonction de son ID.
- **Paramètres de l'URL**:
  - `id`: L'ID du produit que vous souhaitez mettre à jour.
- **Corps de la requête (Request Body)**:
  ```json
  {
    "nom": "Nom mis à jour",
    "description": "Description mise à jour",
    "prix_unitaire": 12.99,
    "quantite_stock": 120,
    "categorie_id": 2
  }
  ```
- **Réponse (Response)**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
  ```json
  {
    "changes": 1
  }
  ```
  - **Code**: `400 Bad Request` (en cas d'erreur dans la mise à jour)

---

## 5. **Supprimer un produit**

- **URL**: `/produits/:id`
- **Méthode**: `DELETE`
- **Description**: Cette API permet de supprimer un produit de la base de données en utilisant son ID.
- **Paramètres de l'URL**:
  - `id`: L'ID du produit que vous souhaitez supprimer.
- **Réponse (Response)**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
  ```json
  {
    "changes": 1
  }
  ```
  - **Code**: `404 Not Found` (si le produit n'existe pas)

---

## 6. **Obtenir les commandes d'un produit**

- **URL**: `/produits/:id/commandes`
- **Méthode**: `GET`
- **Description**: Cette API permet de récupérer toutes les commandes associées à un produit spécifique.
- **Paramètres de l'URL**:
  - `id`: L'ID du produit pour lequel vous voulez récupérer les commandes.
- **Réponse (Response)**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
  ```json
  [
    {
      "id": 1,
      "client_id": 5,
      "date_commande": "2023-01-20",
      "status": "en cours"
    },
    {
      "id": 2,
      "client_id": 3,
      "date_commande": "2023-01-21",
      "status": "expédiée"
    }
  ]
  ```
  - **Code**: `500 Internal Server Error` (en cas d'erreur de récupération)

---

## API Documentation pour la gestion des fournisseurs

### 1. **Créer un fournisseur**

- **URL**: `/fournisseurs`
- **Méthode**: `POST`
- **Description**: Crée un nouveau fournisseur dans la base de données.
- **Corps de la requête**:
  ```json
  {
    "nom": "Nom du fournisseur",
    "contact": "Contact du fournisseur"
  }
  ```
- **Réponse**:
  - **Code**: `201 Created`
  - **Corps de la réponse**:
    ```json
    {
      "id": 1
    }
    ```
  - **Code**: `400 Bad Request` (si le champ `nom` est manquant)
  - **Corps de la réponse**:
    ```json
    {
      "error": "Missing required field: nom"
    }
    ```

---

### 2. **Obtenir tous les fournisseurs**

- **URL**: `/fournisseurs`
- **Méthode**: `GET`
- **Description**: Récupère la liste de tous les fournisseurs.
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "data": [
        {
          "id": 1,
          "nom": "Fournisseur A",
          "contact": "Contact A"
        },
        {
          "id": 2,
          "nom": "Fournisseur B",
          "contact": "Contact B"
        }
      ]
    }
    ```

---

### 3. **Obtenir un fournisseur par ID**

- **URL**: `/fournisseurs/:id`
- **Méthode**: `GET`
- **Description**: Récupère les détails d'un fournisseur spécifique par son ID.
- **Paramètres de l'URL**:
  - `id`: L'identifiant unique du fournisseur.
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "data": {
        "id": 1,
        "nom": "Fournisseur A",
        "contact": "Contact A"
      }
    }
    ```
  - **Code**: `404 Not Found` (si aucun fournisseur ne correspond à l'ID donné)
  - **Corps de la réponse**:
    ```json
    {
      "error": "Fournisseur not found"
    }
    ```

---

### 4. **Mettre à jour un fournisseur**

- **URL**: `/fournisseurs/:id`
- **Méthode**: `PUT`
- **Description**: Met à jour les informations d'un fournisseur existant.
- **Paramètres de l'URL**:
  - `id`: L'identifiant unique du fournisseur.
- **Corps de la requête**:
  ```json
  {
    "nom": "Nom mis à jour",
    "contact": "Contact mis à jour"
  }
  ```
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "changes": 1
    }
    ```
  - **Code**: `400 Bad Request` (si des champs sont manquants ou invalides)

---

### 5. **Supprimer un fournisseur**

- **URL**: `/fournisseurs/:id`
- **Méthode**: `DELETE`
- **Description**: Supprime un fournisseur de la base de données.
- **Paramètres de l'URL**:
  - `id`: L'identifiant unique du fournisseur.
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "changes": 1
    }
    ```
  - **Code**: `404 Not Found` (si aucun fournisseur ne correspond à l'ID donné)
  - **Corps de la réponse**:
    ```json
    {
      "error": "Fournisseur not found"
    }
    ```

---

## Documentation des API pour la gestion des lignes de commande

### 1. **Créer une ligne de commande**

- **URL**: `/lignes-commandes`
- **Méthode**: `POST`
- **Description**: Ajoute une nouvelle ligne de commande à la base de données.
- **Corps de la requête**:
  ```json
  {
    "commande_id": 1,
    "produit_id": 2,
    "quantite": 10,
    "prix_unitaire": 99.99
  }
  ```
- **Réponse**:
  - **Code**: `201 Created`
  - **Corps de la réponse**:
    ```json
    {
      "id": 1
    }
    ```
  - **Code**: `400 Bad Request` (si une contrainte est violée ou si un champ obligatoire est manquant)
  - **Corps de la réponse**:
    ```json
    {
      "error": "Message de l'erreur"
    }
    ```

---

### 2. **Obtenir toutes les lignes de commande**

- **URL**: `/lignes-commandes`
- **Méthode**: `GET`
- **Description**: Récupère toutes les lignes de commande.
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "data": [
        {
          "id": 1,
          "commande_id": 1,
          "produit_id": 2,
          "quantite": 10,
          "prix_unitaire": 99.99
        },
        {
          "id": 2,
          "commande_id": 1,
          "produit_id": 3,
          "quantite": 5,
          "prix_unitaire": 49.99
        }
      ]
    }
    ```

---

### 3. **Obtenir une ligne de commande par ID**

- **URL**: `/lignes-commandes/:id`
- **Méthode**: `GET`
- **Description**: Récupère une ligne de commande spécifique en fonction de son ID.
- **Paramètres de l'URL**:
  - `id`: L'identifiant unique de la ligne de commande.
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "data": {
        "id": 1,
        "commande_id": 1,
        "produit_id": 2,
        "quantite": 10,
        "prix_unitaire": 99.99
      }
    }
    ```
  - **Code**: `404 Not Found` (si aucun résultat n'est trouvé pour l'ID donné)
  - **Corps de la réponse**:
    ```json
    {
      "error": "Ligne_Commande not found"
    }
    ```

---

### 4. **Mettre à jour une ligne de commande**

- **URL**: `/lignes-commandes/:id`
- **Méthode**: `PUT`
- **Description**: Met à jour une ligne de commande existante.
- **Paramètres de l'URL**:
  - `id`: L'identifiant unique de la ligne de commande.
- **Corps de la requête**:
  ```json
  {
    "commande_id": 1,
    "produit_id": 2,
    "quantite": 20,
    "prix_unitaire": 89.99
  }
  ```
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "changes": 1
    }
    ```
  - **Code**: `400 Bad Request` (si des champs sont manquants ou invalides)
  - **Code**: `404 Not Found` (si l'ID de la ligne de commande n'existe pas)

---

### 5. **Supprimer une ligne de commande**

- **URL**: `/lignes-commandes/:id`
- **Méthode**: `DELETE`
- **Description**: Supprime une ligne de commande spécifique de la base de données.
- **Paramètres de l'URL**:
  - `id`: L'identifiant unique de la ligne de commande.
- **Réponse**:
  - **Code**: `200 OK`
  - **Corps de la réponse**:
    ```json
    {
      "changes": 1
    }
    ```
  - **Code**: `404 Not Found` (si aucun enregistrement ne correspond à l'ID donné)

---

### Documentation des API : Top Ventes

#### **Endpoint : Obtenir les produits les plus vendus**

- **URL** : `/api/statistiques/top-produits`
- **Méthode** : `GET`
- **Description** : Récupère les 10 produits les plus vendus, classés par quantité totale commandée.
- **Requête** : Aucune donnée spécifique n'est requise.
- **Réponse** :
  - **Code HTTP 200** : Succès
    - **Structure JSON** :
      ```json
      [
        {
          "id": 1,
          "nom": "Produit A",
          "quantite_totale": 150
        },
        {
          "id": 2,
          "nom": "Produit B",
          "quantite_totale": 120
        }
      ]
      ```
      - `id` : Identifiant unique du produit.
      - `nom` : Nom du produit.
      - `quantite_totale` : Quantité totale commandée pour ce produit.
  - **Code HTTP 500** : Erreur interne du serveur
    - **Structure JSON** :
      ```json
      {
        "error": "Erreur lors de la récupération des statistiques."
      }
      ```

---

#### **Endpoint : Obtenir les meilleurs clients**

- **URL** : `/api/statistiques/top-clients`
- **Méthode** : `GET`
- **Description** : Récupère les 10 meilleurs clients en fonction du montant total dépensé.
- **Requête** : Aucune donnée spécifique n'est requise.
- **Réponse** :
  - **Code HTTP 200** : Succès
    - **Structure JSON** :
      ```json
      [
        {
          "id": 1,
          "nom": "Client A",
          "montant_total": 2000.5
        },
        {
          "id": 2,
          "nom": "Client B",
          "montant_total": 1800.0
        }
      ]
      ```
      - `id` : Identifiant unique du client.
      - `nom` : Nom du client.
      - `montant_total` : Montant total dépensé par le client.
  - **Code HTTP 500** : Erreur interne du serveur
    - **Structure JSON** :
      ```json
      {
        "error": "Erreur lors de la récupération des statistiques."
      }
      ```

---

### Documentation des API : Calcul des Ventes

#### **Endpoint : Calculer les ventes pour une période donnée**

- **URL** : `/api/statistiques/ventes`
- **Méthode** : `GET`
- **Description** : Calcule le montant total des ventes réalisées entre deux dates spécifiées.
- **Paramètres de requête** :
  - `start_date` (obligatoire) : Date de début de la période (au format `YYYY-MM-DD`).
  - `end_date` (obligatoire) : Date de fin de la période (au format `YYYY-MM-DD`).

#### **Exemple de requête** :

```
GET /api/statistiques/ventes?start_date=2025-01-01&end_date=2025-01-31
```

#### **Réponses** :

##### **Code HTTP 200** : Succès

- **Structure JSON** :
  ```json
  {
    "total_ventes": 5000.75
  }
  ```
  - `total_ventes` : Montant total des ventes pour la période spécifiée (en euros ou autre devise configurée).

##### **Code HTTP 400** : Requête invalide

- **Cause** : Les dates de début (`start_date`) et de fin (`end_date`) ne sont pas fournies.
- **Structure JSON** :
  ```json
  {
    "error": "Les dates de début et de fin sont requises."
  }
  ```

##### **Code HTTP 500** : Erreur interne du serveur

- **Cause** : Une erreur s'est produite lors du calcul des ventes.
- **Structure JSON** :
  ```json
  {
    "error": "Erreur lors du calcul des ventes."
  }
  ```

---

#### **Exemple de scénario** :

1. **Requête valide** :

   - **URL** : `/api/statistiques/ventes?start_date=2025-01-01&end_date=2025-01-31`
   - **Réponse** :
     ```json
     {
       "total_ventes": 4500.0
     }
     ```

2. **Requête invalide (dates manquantes)** :

   - **URL** : `/api/statistiques/ventes`
   - **Réponse** :
     ```json
     {
       "error": "Les dates de début et de fin sont requises."
     }
     ```

3. **Erreur interne** :
   - Une erreur de base de données ou autre problème technique entraîne une réponse :
     ```json
     {
       "error": "Erreur lors du calcul des ventes."
     }
     ```

---

### Documentation des API : Produits avec Stock Faible

#### **Endpoint : Liste des produits avec un stock faible**

- **URL** : `/api/produits`
- **Méthode** : `GET`
- **Description** : Récupère les produits dont le stock est inférieur ou égal à un seuil spécifié.

---

#### **Paramètres de requête** :

| Nom     | Type    | Obligatoire | Description                           | Valeur par défaut |
| ------- | ------- | ----------- | ------------------------------------- | ----------------- |
| `seuil` | Integer | Non         | Seuil maximum pour le stock à inclure | `10`              |

---

#### **Exemple de requête** :

```
GET /api/produits?seuil=5
```

---

#### **Réponses** :

##### **Code HTTP 200** : Succès

- **Structure JSON** :
  ```json
  [
    {
      "id": 1,
      "nom": "Produit A",
      "quantite_stock": 3
    },
    {
      "id": 2,
      "nom": "Produit B",
      "quantite_stock": 5
    }
  ]
  ```
  - Chaque objet représente un produit avec :
    - `id` : Identifiant unique du produit.
    - `nom` : Nom du produit.
    - `quantite_stock` : Quantité actuelle en stock.

##### **Code HTTP 500** : Erreur interne du serveur

- **Cause** : Une erreur est survenue lors de l'exécution de la requête à la base de données.
- **Structure JSON** :
  ```json
  {
    "error": "Erreur lors de la récupération des stocks faibles."
  }
  ```

---

#### **Exemple de scénario** :

1. **Requête valide** :

   - **URL** : `/api/produits?seuil=5`
   - **Réponse** :
     ```json
     [
       {
         "id": 1,
         "nom": "Produit A",
         "quantite_stock": 3
       },
       {
         "id": 2,
         "nom": "Produit B",
         "quantite_stock": 5
       }
     ]
     ```

2. **Requête sans seuil spécifié** :

   - **URL** : `/api/produits`
   - **Réponse (par défaut seuil = 10)** :
     ```json
     [
       {
         "id": 3,
         "nom": "Produit C",
         "quantite_stock": 8
       }
     ]
     ```

3. **Erreur interne** :
   - Une erreur de base de données ou autre problème technique entraîne une réponse :
     ```json
     {
       "error": "Erreur lors de la récupération des stocks faibles."
     }
     ```
