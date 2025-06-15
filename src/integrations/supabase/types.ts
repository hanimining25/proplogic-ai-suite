export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      client_activities: {
        Row: {
          client_id: string
          contact_id: string | null
          created_at: string
          date: string
          description: string | null
          id: string
          next_steps: string | null
          outcome: string | null
          tags: string[] | null
          team_member: string | null
          title: string
          type: Database["public"]["Enums"]["activity_type"]
          updated_at: string
        }
        Insert: {
          client_id: string
          contact_id?: string | null
          created_at?: string
          date: string
          description?: string | null
          id?: string
          next_steps?: string | null
          outcome?: string | null
          tags?: string[] | null
          team_member?: string | null
          title: string
          type: Database["public"]["Enums"]["activity_type"]
          updated_at?: string
        }
        Update: {
          client_id?: string
          contact_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          next_steps?: string | null
          outcome?: string | null
          tags?: string[] | null
          team_member?: string | null
          title?: string
          type?: Database["public"]["Enums"]["activity_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_activities_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          annual_revenue: number | null
          created_at: string
          description: string | null
          employee_count: number | null
          health_score: number
          id: string
          industry: string | null
          last_contact_date: string | null
          location: string | null
          logo_url: string | null
          name: string
          org_id: string
          status: Database["public"]["Enums"]["client_status"]
          tags: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          annual_revenue?: number | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          health_score?: number
          id?: string
          industry?: string | null
          last_contact_date?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          org_id: string
          status?: Database["public"]["Enums"]["client_status"]
          tags?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          annual_revenue?: number | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          health_score?: number
          id?: string
          industry?: string | null
          last_contact_date?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          org_id?: string
          status?: Database["public"]["Enums"]["client_status"]
          tags?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          client_id: string
          communication_preference:
            | Database["public"]["Enums"]["comm_preference"]
            | null
          created_at: string
          department: string | null
          email: string | null
          first_name: string
          id: string
          last_contact_date: string | null
          last_name: string
          linkedin_url: string | null
          notes: string | null
          phone: string | null
          role: Database["public"]["Enums"]["contact_role"]
          title: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          communication_preference?:
            | Database["public"]["Enums"]["comm_preference"]
            | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_contact_date?: string | null
          last_name: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["contact_role"]
          title?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          communication_preference?:
            | Database["public"]["Enums"]["comm_preference"]
            | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_contact_date?: string | null
          last_name?: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["contact_role"]
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          created_at: string
          id: string
          org_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          org_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          expected_close_date: string | null
          id: string
          notes: string | null
          probability: number | null
          stage: Database["public"]["Enums"]["opportunity_stage"]
          tags: string[] | null
          team_member: string | null
          title: string
          updated_at: string
          value: number | null
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage: Database["public"]["Enums"]["opportunity_stage"]
          tags?: string[] | null
          team_member?: string | null
          title: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          tags?: string[] | null
          team_member?: string | null
          title?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rfps: {
        Row: {
          client_id: string | null
          client_name: string | null
          created_at: string
          document_url: string | null
          due_date: string | null
          id: string
          org_id: string
          relevance_score: number | null
          status: Database["public"]["Enums"]["rfp_status"]
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          client_name?: string | null
          created_at?: string
          document_url?: string | null
          due_date?: string | null
          id?: string
          org_id: string
          relevance_score?: number | null
          status?: Database["public"]["Enums"]["rfp_status"]
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          client_name?: string | null
          created_at?: string
          document_url?: string | null
          due_date?: string | null
          id?: string
          org_id?: string
          relevance_score?: number | null
          status?: Database["public"]["Enums"]["rfp_status"]
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rfps_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfps_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_organization_and_admin: {
        Args: { org_name: string }
        Returns: string
      }
      get_my_org_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      activity_type:
        | "meeting"
        | "call"
        | "email"
        | "proposal"
        | "contract"
        | "note"
      app_role:
        | "admin"
        | "commercial"
        | "proposal_writer"
        | "crm_manager"
        | "finance"
        | "executive"
      client_status: "active" | "inactive" | "prospect"
      comm_preference: "email" | "phone" | "linkedin" | "in-person"
      contact_role: "primary" | "secondary" | "stakeholder"
      opportunity_stage:
        | "discovery"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost"
      rfp_status:
        | "new"
        | "in_progress"
        | "submitted"
        | "won"
        | "lost"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: [
        "meeting",
        "call",
        "email",
        "proposal",
        "contract",
        "note",
      ],
      app_role: [
        "admin",
        "commercial",
        "proposal_writer",
        "crm_manager",
        "finance",
        "executive",
      ],
      client_status: ["active", "inactive", "prospect"],
      comm_preference: ["email", "phone", "linkedin", "in-person"],
      contact_role: ["primary", "secondary", "stakeholder"],
      opportunity_stage: [
        "discovery",
        "proposal",
        "negotiation",
        "closed-won",
        "closed-lost",
      ],
      rfp_status: [
        "new",
        "in_progress",
        "submitted",
        "won",
        "lost",
        "archived",
      ],
    },
  },
} as const
