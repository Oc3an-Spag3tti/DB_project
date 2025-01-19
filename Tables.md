### **1. Categories**
Cette table stocke les catégories auxquelles les produits peuvent appartenir.

| Colonne     | Type          | Description                              |
|-------------|---------------|------------------------------------------|
| `id`        | INTEGER       | Clé primaire unique pour chaque catégorie. |
| `nom`       | VARCHAR(255)  | Nom de la catégorie. Obligatoire.        |

---

### **2. Produits**
Cette table contient les informations sur les produits disponibles.

| Colonne         | Type            | Description                                                      |
|-----------------|-----------------|------------------------------------------------------------------|
| `id`            | INTEGER         | Clé primaire unique pour chaque produit.                        |
| `nom`           | VARCHAR(255)    | Nom du produit. Obligatoire.                                    |
| `description`   | TEXT            | Description du produit.                                         |
| `prix_unitaire` | DECIMAL(10, 2)  | Prix unitaire du produit. Obligatoire.                          |
| `quantite_stock`| INT             | Quantité en stock pour le produit. Obligatoire.                 |
| `categorie_id`  | INT             | Référence à l'ID de la catégorie dans la table `Categories`.     |

- **Clé étrangère** : `categorie_id` fait référence à `id` dans la table `Categories`.

---

### **3. Fournisseurs**
Cette table stocke les informations sur les fournisseurs des produits.

| Colonne     | Type          | Description                             |
|-------------|---------------|-----------------------------------------|
| `id`        | INTEGER       | Clé primaire unique pour chaque fournisseur. |
| `nom`       | VARCHAR(255)  | Nom du fournisseur. Obligatoire.       |
| `contact`   | VARCHAR(255)  | Informations de contact du fournisseur. |

---

### **4. Produits_Fournisseurs**
Cette table crée une relation entre les produits et leurs fournisseurs (relation plusieurs-à-plusieurs).

| Colonne          | Type | Description                                                   |
|------------------|------|---------------------------------------------------------------|
| `produit_id`     | INT  | Référence à l'ID d'un produit dans la table `Produits`.       |
| `fournisseur_id` | INT  | Référence à l'ID d'un fournisseur dans la table `Fournisseurs`.|

- **Clés primaires** : Combinaison de `produit_id` et `fournisseur_id`.
- **Clés étrangères** :
  - `produit_id` fait référence à `id` dans la table `Produits`.
  - `fournisseur_id` fait référence à `id` dans la table `Fournisseurs`.

---

### **5. Clients**
Cette table contient les informations sur les clients.

| Colonne     | Type          | Description                             |
|-------------|---------------|-----------------------------------------|
| `id`        | INTEGER       | Clé primaire unique pour chaque client. |
| `nom`       | VARCHAR(255)  | Nom du client. Obligatoire.            |
| `adresse`   | TEXT          | Adresse du client.                     |
| `contact`   | VARCHAR(255)  | Informations de contact du client.     |

---

### **6. Commandes**
Cette table enregistre les commandes passées par les clients.

| Colonne         | Type          | Description                                   |
|-----------------|---------------|-----------------------------------------------|
| `id`            | INTEGER       | Clé primaire unique pour chaque commande.    |
| `date_commande` | DATE          | Date de la commande. Obligatoire.            |
| `client_id`     | INT           | Référence à l'ID du client dans la table `Clients`. |
| `status`        | VARCHAR(50)   | Statut de la commande (exemple : "en cours", "terminée"). Obligatoire. |

- **Clé étrangère** : `client_id` fait référence à `id` dans la table `Clients`.

---

### **7. Lignes_Commandes**
Cette table détaille les produits inclus dans chaque commande.

| Colonne         | Type           | Description                                                       |
|-----------------|----------------|-------------------------------------------------------------------|
| `id`            | INTEGER        | Clé primaire unique pour chaque ligne de commande.               |
| `commande_id`   | INT            | Référence à l'ID de la commande dans la table `Commandes`.        |
| `produit_id`    | INT            | Référence à l'ID du produit dans la table `Produits`.             |
| `quantite`      | INT            | Quantité de produit commandée. Obligatoire.                      |
| `prix_unitaire` | DECIMAL(10, 2) | Prix unitaire du produit au moment de la commande. Obligatoire.   |

- **Clés étrangères** :
  - `commande_id` fait référence à `id` dans la table `Commandes`.
  - `produit_id` fait référence à `id` dans la table `Produits`.

---

### Relations
- **Categories ↔ Produits** : Relation un-à-plusieurs (une catégorie peut avoir plusieurs produits).
- **Produits ↔ Fournisseurs** : Relation plusieurs-à-plusieurs via la table `Produits_Fournisseurs`.
- **Clients ↔ Commandes** : Relation un-à-plusieurs (un client peut passer plusieurs commandes).
- **Commandes ↔ Lignes_Commandes** : Relation un-à-plusieurs (une commande peut inclure plusieurs produits).
- **Produits ↔ Lignes_Commandes** : Relation un-à-plusieurs (un produit peut apparaître dans plusieurs commandes).
