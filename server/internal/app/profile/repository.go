package profile

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type repository struct {
	db *gorm.DB
}

type Repository interface {
	FindByID(id uuid.UUID) (domain.User, error)
	UpdateByID(id uuid.UUID, input domain.User) (domain.User, error)
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r *repository) FindByID(id uuid.UUID) (domain.User, error) {
	var user domain.User
	err := r.db.Where("id = ?", id).First(&user).Error
	return user, err
}

func (r *repository) UpdateByID(id uuid.UUID, input domain.User) (domain.User, error) {
	err := r.db.Where("id = ?", id).Updates(&input).Error
	if err != nil {
		return domain.User{}, err
	}

	return r.FindByID(id)
}
