package auth

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"time"
)

type repository struct {
	db *gorm.DB
}

type Repository interface {
	FindByID(id uuid.UUID) (domain.User, error)
	FindUserByEmail(email string) (domain.User, error)
	Create(input domain.User) (domain.User, error)
	FindByResetToken(token string) (domain.User, error)
	UpdateResetData(userId uuid.UUID, code string) error
	FindByForgotConfirmationCode(confirmationCode string) (domain.User, error)
	UpdatePasswordByConfirmationCode(confirmationCode string, hashPassword string) error
	CleanResetData(confirmationCode string) error
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r *repository) FindByID(id uuid.UUID) (domain.User, error) {
	var user domain.User
	err := r.db.Where("id = ?", id).First(&user).Error
	return user, err
}

func (r *repository) FindUserByEmail(email string) (domain.User, error) {
	var user domain.User
	err := r.db.Where("email = ?", email).First(&user).Error
	return user, err
}

func (r *repository) Create(input domain.User) (domain.User, error) {
	data := domain.User{
		Email:      input.Email,
		Password:   input.Password,
		FirstName:  input.FirstName,
		LastName:   input.LastName,
		IsVerified: input.IsVerified,
	}
	err := r.db.Create(&data).Error
	if err != nil {
		return domain.User{}, err
	}
	return r.FindByID(data.ID)
}

func (r *repository) FindByResetToken(token string) (domain.User, error) {
	var user domain.User
	err := r.db.Where("reset_password_token = ?", token).First(&user).Error
	return user, err
}

func (r *repository) FindByForgotConfirmationCode(confirmationCode string) (domain.User, error) {
	var user domain.User
	err := r.db.Where("reset_password_token = ?", confirmationCode).First(&user).Error
	return user, err
}

func (r *repository) UpdateResetData(userId uuid.UUID, code string) error {
	expire := time.Now().Add(30 * time.Minute)

	err := r.db.Where("id = ?", userId).Updates(&domain.User{
		ResetPasswordToken:  code,
		ResetPasswordExpire: &expire,
	}).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *repository) UpdatePasswordByConfirmationCode(confirmationCode string, hashPassword string) error {
	err := r.db.Where("reset_password_token = ?", confirmationCode).Updates(&domain.User{
		Password: hashPassword,
	}).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *repository) CleanResetData(confirmationCode string) error {
	err := r.db.Model(&domain.User{}).Where("reset_password_token = ?", confirmationCode).Update("reset_password_expire", nil).Error
	if err != nil {
		return err
	}

	err = r.db.Model(&domain.User{}).Where("reset_password_token = ?", confirmationCode).Update("reset_password_token", nil).Error
	if err != nil {
		return err
	}

	return nil
}