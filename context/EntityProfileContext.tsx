import React, { createContext, useContext, useState } from 'react';

type EntityType = 'company' | 'manager' | null;

interface EntityProfileContextType {
  activeEntity: EntityType;
  openProfile: (type: 'company' | 'manager') => void;
  closeProfile: () => void;
}

const EntityProfileContext = createContext<EntityProfileContextType | undefined>(undefined);

export const EntityProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeEntity, setActiveEntity] = useState<EntityType>(null);

  const openProfile = (type: 'company' | 'manager') => {
    setActiveEntity(type);
  };

  const closeProfile = () => {
    setActiveEntity(null);
  };

  return (
    <EntityProfileContext.Provider value={{ activeEntity, openProfile, closeProfile }}>
      {children}
    </EntityProfileContext.Provider>
  );
};

export const useEntityProfile = () => {
  const context = useContext(EntityProfileContext);
  if (context === undefined) {
    throw new Error('useEntityProfile must be used within an EntityProfileProvider');
  }
  return context;
};