package httpheader

import (
	"context"
	"fmt"
	"net/textproto"

	"github.com/sourcegraph/sourcegraph/internal/auth/providers"
	"github.com/sourcegraph/sourcegraph/internal/extsvc"
	"github.com/sourcegraph/sourcegraph/schema"
)

type provider struct {
	c *schema.HTTPHeaderAuthProvider
}

// ConfigID implements providers.Provider.
func (provider) ConfigID() providers.ConfigID {
	return providers.ConfigID{Type: providerType}
}

// Config implements providers.Provider.
func (p provider) Config() schema.AuthProviders { return schema.AuthProviders{HttpHeader: p.c} }

// Refresh implements providers.Provider.
func (p provider) Refresh(context.Context) error { return nil }

// CachedInfo implements providers.Provider.
func (p provider) CachedInfo() *providers.Info {
	return &providers.Info{
		DisplayName: fmt.Sprintf("HTTP authentication proxy (%q header)", textproto.CanonicalMIMEHeaderKey(p.c.UsernameHeader)),
	}
}

func (p *provider) ExternalAccountInfo(ctx context.Context, account extsvc.Account) (*extsvc.PublicAccountData, error) {
	return &extsvc.PublicAccountData{
		DisplayName: &account.AccountID,
	}, nil
}
